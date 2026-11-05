<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Order;
use App\Models\PaymentRedsys;
use App\Models\PaymentSubpolygon;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // in charge of all the order / payment? things?
    // 90% of this is just payment controller,,,, too bad!


    // seller show orders
    public function sellerIndex()
    {
        $user = Auth::user();

        $orders = $user->sellerOrders;

        return view("seller.orders.index", ["orders" => $orders]);
    }






    // checkout code (show form, ask for service details)
    public function checkout(Request $request)
    {
        // TODO, VALIDATION

        $service = Service::where("slug", $request->service)->first();
        $seller = User::where("username", $request->seller)->first();
        $client = User::find(Auth::id());

        // TODO i don't like how this is done
        if (isset($request->pay)) {
            // TODO, this could be moved to a payment controller or simillar
            // TODO, this probably has a lot of vulnerabilities or problems evaluating purchases correctly, check!

            // set up values for processing
            if ($request->pay == "subpolygon") {
                $payment = new PaymentSubpolygon;
                $merchantCode = env('SUBPOLYGON_MERCHANT_CODE');
                $merchantTerminal = env('SUBPOLYGON_TERMINAL');
                $merchantKey = env('SUBPOLYGON_KEY');
                $bankUrl = "https://bank.subpolygon.com/veftpos/performPayment";
            } elseif ($request->pay == "redsys") {
                $payment = new PaymentRedsys;
                $merchantCode = env('REDSYS_MERCHANT_CODE');
                $merchantTerminal = env('REDSYS_TERMINAL');
                $merchantKey = env('REDSYS_KEY');
                $bankUrl = "https://sis-t.redsys.es:25443/sis/realizarPago";
            } else {
                // error out here
                abort(400);
            }

            $payment->user_id = Auth::id();
            $payment->amount = $service->price;
            $payment->direction = "in";
            $payment->status = "pending";
            $payment->save();

            $order = Order::find($request->order);
            // ps, thanks laravel docs for not making this clear ;)
            $order->payment()->associate($payment);
            $order->save();


            // TODO, make it use async HTTP response 
            $urlOKKO = url("/orders/checkout/response");

            $data = array(
                "DS_MERCHANT_AMOUNT" => $service->price * 100,
                "DS_MERCHANT_ORDER" => ($request->pay == "subpolygon" ? "S" : "R") . str_pad($payment->id, 11, "0", STR_PAD_LEFT),
                "DS_MERCHANT_MERCHANTCODE" => $merchantCode,
                "DS_MERCHANT_CURRENCY" => "978",
                "DS_MERCHANT_TRANSACTIONTYPE" => "0",
                "DS_MERCHANT_TERMINAL" => $merchantTerminal,
                // "DS_MERCHANT_MERCHANTURL" => $url,
                "DS_MERCHANT_URLOK" => $urlOKKO,
                "DS_MERCHANT_URLKO" => $urlOKKO,
                "DS_MERCHANT_MERCHANTDATA" => "orderID",
            );

            // Generate reuqest parameters
            $params = str_replace("=", "", strtr(base64_encode(json_encode($data)), '+/', '-_'));

            // generate request signature
            $diversifyingFactor = $data["DS_MERCHANT_ORDER"];
            $fixedKey = str_pad(substr($merchantKey, 0, 16), 16, "0");
            $firma = base64_encode(openssl_encrypt($diversifyingFactor, "aes-128-cbc", $fixedKey, OPENSSL_RAW_DATA, "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"));
            $sha = hash_hmac('sha512', $params, $firma, true);
            $signature = str_replace("=", "", strtr(base64_encode($sha), '+/', '-_'));


            $html = <<<HTML
            <form action="{$bankUrl}" method="post">
            <input type="hidden" name="Ds_SignatureVersion" value="HMAC_SHA512_V2" autocomplete="off"/>
            <input type="hidden" name="Ds_MerchantParameters" value="{$params}" autocomplete="off"/>
            <input type="hidden" name="Ds_Signature" value="{$signature}" autocomplete="off"/>
            </form>
            <script>document.forms[0].submit();</script>
            HTML;

            return $html;
        } elseif (isset($request->message)) {
            // TODO, this code is the same as the store function in ChatController, put them both in a shared function or something

            $conv = Conversation::where('client_id', $client->id)->Where('seller_id', $seller->id)->first();
            if (!$conv) {
                // make new conversation
                $conv = new Conversation;
                $conv->client_id = $client->id;
                $conv->seller_id = $seller->id;
                $conv->save();
            }

            // add order
            $order = new Order;
            $order->client_id = $client->id;
            $order->service_id = $service->id;
            $order->seller_id = $seller->id;
            $order->status_id = 1;
            $order->amount = $service->price;
            $order->save();

            $conv->order_id = $order->id;
            $conv->service_id = $service->id;
            $conv->save();

            // add message
            $message = new Message;
            $message->user_id = $client->id;
            $message->conversation_id = $conv->id;
            $message->message = $request->message;
            $message->save();

            // add to message
            $message->service()->attach($service);
            $message->order()->attach($order);



            return view("orders.checkout", ["step" => 2, "service" => $service, "seller" => $seller, "order" => $order]);
        } elseif (isset($request->service)) {

            return view("orders.checkout", ["step" => 1, "service" => $service, "seller" => $seller]);
        }
        return ("error :?");
    }

    // accept payment
    public function paymentResponse(Request $request)
    {
        $user = User::find(Auth::id());

        if (empty($request)) {
            return ("Request empty");
        }

        if ($request->Ds_SignatureVersion != "HMAC_SHA512_V2") {
            return ("Invalid signature type");
        }

        $b64params = $request->Ds_MerchantParameters;
        $signature = $request->Ds_Signature;
        // looooooooooooooooooooooong looooooooooooooooooooooooooooooooooooooooong maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan
        $params = array_change_key_case(json_decode(base64_decode(strtr(str_pad($b64params, strlen($b64params) + (4 - strlen($b64params) % 4) % 4, '=', STR_PAD_RIGHT), '-_', '+/')), true), CASE_UPPER);

        // get the data for the relevant payment method
        if (substr($params["DS_ORDER"], 0, 1) == "S") {
            // Subpolygon
            $payment = PaymentSubpolygon::find(substr($params["DS_ORDER"], 1));
            $merchantKey = env('SUBPOLYGON_KEY');
            $subpolygon = True;
        } else {
            // redsys
            $payment = PaymentRedsys::find(substr($params["DS_ORDER"], 1));
            $merchantKey = env('REDSYS_KEY');
        }


        // ----------------- compute our own signature with the key -----------------
        $diversifyingFactor = $params["DS_ORDER"];
        $fixedKey = str_pad(substr($merchantKey, 0, 16), 16, "0");
        $firma = base64_encode(openssl_encrypt($diversifyingFactor, "aes-128-cbc", $fixedKey, OPENSSL_RAW_DATA, "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"));
        $sha = hash_hmac('sha512', $b64params, $firma, true);
        $ourSignature = str_replace("=", "", strtr(base64_encode($sha), '+/', '-_'));

        // compare signatures to verify integrity
        if (strcasecmp($signature, $ourSignature) !== 0) {
            return ("invalid signature");
        }

        if ($params["DS_RESPONSE"] != 0) {
            return ("not successfull");
        }

        // if we are here, the transaction is validated as genuine

        if ($payment->status == "pending") {
            $payment->status = "success";
            $payment->auth = $params["DS_AUTHORISATIONCODE"];
            $payment->response = $params["DS_RESPONSE"];
            $payment->save();


            // update order
            $order = $payment->order;
            $order->status_id = 2;
            $order->save();

            $conv = $order->conversation;

            // send a message too, why not
            $message = new Message;
            $message->user_id = $user->id;
            $message->conversation_id = $conv->id;
            $message->message = "Order payed!";
            $message->save();


            if (isset($subpolygon)) {
                $message->paymentSubpolygon()->attach($payment);
            } else {
                $message->paymentRedsys()->attach($payment);
            }
            $message->save();


            return redirect("/chat/" . $conv->seller->username);
        }

        return ("Transaction already validated");
    }
}
