<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\MessageMedia;
use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
{
    /**
     * List user chats.
     */
    public function index()
    {
        $user = Auth::user();
        $conversations = Conversation::where('client_id', $user->id)->orderBy('created_at', 'desc')->get();
        return view("chat.index", ["conversations" => $conversations]);
    }

    /**
     * chat form? (temporary)
     */
    public function create(Request $request)
    {
        return view("chat.form", ["request" => $request]);
    }

    /**
     * Create conversation, redirect to it
     */
    public function store(Request $request)
    {
        // TODO, validate

        $seller = User::where("username", $request->seller)->first();
        $client = User::find(Auth::id());

        // dd($client);

        // check if a conversation already exist between seller and client
        $conv = Conversation::where('client_id', $client->id)->Where('seller_id', $seller->id)->first();
        if (!$conv) {
            // make new conversation
            $conv = new Conversation;
            $conv->client_id = $client->id;
            $conv->seller_id = $seller->id;
            $conv->save();
        }

        // add message
        $message = new Message;
        $message->user_id = $client->id;
        $message->conversation_id = $conv->id;
        $message->message = $request->message;
        $message->save();

        // add service
        if ($request->service) {
            $service = Service::where("slug", $request->service)->first();
            $message->service()->attach($service);
            $conv->service_id = $service->id;
            $conv->save();
        }


        return redirect("/chat/" . $seller->username);
    }

    /**
     * Display CLIENT chat conversation
     */
    public function show(string $username)
    {
        $user = Auth::user();

        $conversations = Conversation::where('client_id', $user->id)->orderBy('created_at', 'desc')->get();

        // i don't even wanna think about what happens when two sellers message eachother
        // TODO, figure it out
        $seller = User::where("username", $username)->first();

        $conversation = Conversation::where('client_id', $user->id)->Where('seller_id', $seller->id)->first();
        // i know this looks ugly, but it literally  saves tens or hundreds of queries
        $messages = Message::where("conversation_id", $conversation->id)->with('sender')->with('media')->with('service')->get();


        return view("chat.index", ["conversations" => $conversations, "conversation" => $conversation, "messages" => $messages]);
    }

    /**
     * Update (add message, update status, etc)
     */
    public function update(Request $request, string $username)
    {
        // TODO, validate

        $user = User::find(Auth::id());
        $seller = User::where("username", $username)->first();


        $conversation = Conversation::where('seller_id', $seller->id)->first();

        $message = new Message;
        $message->user_id = $user->id;
        $message->conversation_id = $conversation->id;
        $message->message = $request->message;
        $message->save();

        // handle media uploads
        if ($request->file('media')) {
            foreach ($request->file('media') as $mediaFile) {
                // TODO, same as seller, input MIME validation and reasonable max upload size
                $media = new MessageMedia;

                // Media type
                // 1 image, 2 video, 3 audio, 255 blob(no preview)
                $mediaType = $mediaFile->getMimeType();
                if (str_starts_with($mediaType, "image/")) {
                    $media->type = 1;
                } elseif (str_starts_with($mediaType, "video/")) {
                    $media->type = 2;
                }
                // TODO, audio
                else {
                    // blob
                    $media->type = 255;
                }

                $media->url = Storage::disk('local')->putFile("chat/" . $conversation->id, $mediaFile);
                $media->save();

                $message->media()->attach($media);
            }
        }


        return back();
    }


    /**
     * (temporary)
     */
    public function edit(string $username)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $username)
    {
        //
    }


    // Seller chat
    /**
     * List seller chats.
     */
    public function sellerIndex()
    {
        $user = Auth::user();
        $conversations = Conversation::where('seller_id', $user->id)->orderBy('created_at', 'desc')->get();
        return view("seller.chat.index", ["conversations" => $conversations]);
    }

    /**
     * Display CLIENT chat conversation
     */
    public function sellerShow(string $username)
    {
        $user = Auth::user();

        $conversations = Conversation::where('seller_id', $user->id)->orderBy('created_at', 'desc')->get();

        $client = User::where("username", $username)->first();

       $conversation = Conversation::where('seller_id', $user->id)->where('client_id', $client->id)->first();
        // i know this looks ugly, but it literally  saves tens or hundreds of queries
        $messages = Message::where("conversation_id", $conversation->id)->with('sender')->with('media')->with('service')->get();


        return view("seller.chat.index", ["conversations" => $conversations, "conversation" => $conversation, "messages" => $messages]);
    }


    /**
     * Update (add message, update status, etc)
     */
    public function sellerUpdate(Request $request, string $username)
    {
        // TODO, validate

        $user = User::find(Auth::id());
        $client = User::where("username", $username)->first();

        // TODO, fix ugly
        $conversation = Conversation::where('seller_id', $user->id)->where('client_id', $client->id)->first();

        // message
        if (isset($request->price)) {
            // price

            // Incredibly stupid and bad code here, please cry
            // $service = Message::has("service")->with("service")->where("conversation_id", $conversation->id)->orderByDesc("created_at")->first()->service->first();

            // fixed, isn't this nice
            $service = $conversation->service;

            $order = new Order;
            $order->client_id = $client->id;
            $order->service_id = $service->id;
            $order->seller_id = $user->id;
            $order->status_id = 1;
            $order->amount = $request->price;
            $order->save();

            $conversation->order_id = $order->id;

            // send message
            $message = new Message;
            $message->user_id = $user->id;
            $message->conversation_id = $conversation->id;
            $message->message = $request->message;
            $message->save();

            $message->order()->attach($order);
        } elseif (isset($request->message)) {
            // why am i checking this again?

            $message = new Message;
            $message->user_id = $user->id;
            $message->conversation_id = $conversation->id;
            $message->message = $request->message;
            $message->save();

            // handle media uploads
            if ($request->file('media')) {
                foreach ($request->file('media') as $mediaFile) {
                    // TODO, same as seller, input MIME validation and reasonable max upload size
                    $media = new MessageMedia;

                    // Media type
                    // 1 image, 2 video, 3 audio, 255 blob(no preview)
                    $mediaType = $mediaFile->getMimeType();
                    if (str_starts_with($mediaType, "image/")) {
                        $media->type = 1;
                    } elseif (str_starts_with($mediaType, "video/")) {
                        $media->type = 2;
                    }
                    // TODO, audio
                    else {
                        // blob
                        $media->type = 255;
                    }

                    $media->url = Storage::disk('local')->putFile("chat/" . $conversation->id, $mediaFile);
                    $media->save();

                    $message->media()->attach($media);
                }
            }
        }


        return back();
    }
}
