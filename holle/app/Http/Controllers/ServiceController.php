<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceMedia;
use App\Models\User;
use Illuminate\Http\File;
use App\Models\Conversation;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{

    /**
     * Display the specified service.
     */
    public function show(String $username, string $slug)
    {
        $service = Service::where("slug", $slug)->first();
        if (!$service->published) {
            abort(404);
        }
        // $cover = $service->media->where('cover', 1)->value("url");
        // $media = $service->media->where('cover', 0)->sortBy("position");
        $media = $service->media->sortBy("position");


        return view("services.show", ["service" => $service, "media" => $media]);
    }
    /**
     * Display the seller dashboard.
     */
    public function dashboard()
    {
        $services = Service::where("seller_id", Auth::id())->get();

        $totalServices = $services->count();
        $activeServices = $services->where("published", true)->count();

        $totalOrders = Order::where("seller_id", Auth::id())->count();
        $soldOrders = Order::where("seller_id", Auth::id())
            ->whereHas("status", function ($query) {
                $query->where("name", "Complete");
            })->count();

        $activeChats = Conversation::where("seller_id", Auth::id())->count();
        $totalRevenue = Order::where("seller_id", Auth::id())
            ->whereHas("status", function ($query) {
                $query->where("name", "Complete");
            })->sum("amount");
        $stats = [
            "avgValue" => $totalServices > 0 ? round($services->avg("price"), 2) : 0,
            "minPrice" => $totalServices > 0 ? $services->min("price") : 0,
            "maxPrice" => $totalServices > 0 ? $services->max("price") : 0,
            "totalServices" => $totalServices,
            "activeServices" => $activeServices,
            "sold" => $soldOrders,
            "activeChats" => $activeChats,
            "percentageSold" => $totalOrders > 0 ? round(($soldOrders / $totalOrders) * 100) : 0,
            "totalRevenue" => $totalRevenue,
        ];

        return view("seller.dash", ["services" => $services, "stats" => $stats]);
    }
    /**
     * Display services by seller.
     */
    public function indexSeller(String $username)
    {
        $user = User::where("username", $username)->first();

        if ($user->is_seller == false) {
            abort(404);
        }

        $services = $user->services()->get();


        return view("services.seller", ["services" => $services, "seller" => $user]);
    }

    /**
     * search
     */
    public function search(Request $request)
    {
        // $query = $request->query();

        // if has as FILLED q parameter
        if ($request->filled('q')) {
            // results get automatically ordered based on score, beautifull
            $services = Service::where("published", true)->whereFullText(['title', 'description'], $request->q)->get();
        }
        // if autocompleate parameter, do that
        elseif ($request->has('autocomplete')) {
            return ("TODO, autocomplete");
        }
        // if no parameters, return all in cronological order
        else {
            $services = Service::where("published", true)->orderBy('created_at', "desc")->get();
        }

        // return
        return view("services.search", ["services" => $services]);
    }



    // Seller / admin functions
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::where("seller_id", Auth::id())->get();
        return view("seller.services.index", ["services" => $services]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("seller.services.create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ["string", "required"],
        ]);

        $service = new Service;
        $service->title = $request->title;
        $service->slug = "";
        $service->seller_id = Auth::id();
        $service->save();
        $service->slug = Str::slug($request->title, '-') . "-" . $service->id;
        $service->save();

        Storage::disk('public')->makeDirectory("/services/" . $service->slug);

        return redirect("/seller/services/" . $service->slug);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $slug)
    {
        // TODO, make sure they OWN the service
        $service = Service::where("slug", $slug)->first();


        return view("seller.services.show", ["service" => $service]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        $request->validate([
            'title' => ["string", "required"],
            'description' => ["string", "required"],
            // TODO, fill
        ]);

        $service = Service::where("slug", $slug)->first();

        $service->title = $request->title;
        $service->description = $request->description;
        $service->price = $request->price;
        $service->published = $request->has("published");
        $service->slug = Str::slug($request->title, '-') . "-" . $service->id;
        $service->save();

        // TODO, check for better solutions?
        // Handle media edits
        if ($request->mediaItem) {
            $media = $service->media->keyBy('id');
            foreach ($request->mediaItem as $mediaItem) {
                if (isset($mediaItem["delete"])) {
                    Storage::disk('public')->delete(substr($media[$mediaItem["id"]]->url, 9));
                    $media[$mediaItem["id"]]->delete();
                } else {
                    $media[$mediaItem["id"]]->position = $mediaItem["pos"];
                    $media[$mediaItem["id"]]->alt = $mediaItem["alt"];
                    $media[$mediaItem["id"]]->cover = ($mediaItem["id"] == $request->cover);
                    $media[$mediaItem["id"]]->save();
                }
            }
        }

        // handle media uploads
        if ($request->file('media')) {
            foreach ($request->file('media') as $mediaFile) {
                //process each file
                // BIG TODO, input MIME validation and reasonable max upload size
                $media = new ServiceMedia;
                $media->service_id = $service->id;

                // Media type
                // 1 image, 2 video; up to 255 for future use 
                $mediaType = $mediaFile->getMimeType();
                if (str_starts_with($mediaType, "image/")) {
                    // image
                    $media->type = 1;
                } elseif (str_starts_with($mediaType, "video/")) {
                    // video
                    $media->type = 2;
                } else {
                    // weird file, skip
                    continue;
                }

                $media->position = 0; // it really doesn't matter if multiple have the same number
                $media->cover = false; // can be changed later

                // TODO, replace with storepublicly
                $media->url = "/storage/" . Storage::disk('public')->putFile("services/" . $service->slug, $mediaFile);
                // $media->alt // alt not necessary, but would be nice to have
                $media->save();
            }
        }



        return redirect("/seller/services/" . $service->slug);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }

    public function generateAi(string $slug)
    {
        $service = Service::where("slug", $slug)->first();

        if (!$service || $service->seller_id !== Auth::id()) {
            abort(403);
        }

        $prompt = 'You are helping a seller on a marketplace write a listing. '
            . 'Given the service title "' . $service->title . '", write a short, appealing '
            . 'description (2-3 sentences) and suggest a fair price in EUR. '
            . 'Respond ONLY with raw JSON in this exact format, no markdown fences: '
            . '{"description": "...", "price": 0.00}';

        $response = Http::timeout(20)
            ->withToken(config('services.groq.key'))
            ->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'openai/gpt-oss-120b',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

        if ($response->failed()) {
            Log::error('AI generation failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return response()->json(['error' => 'AI service unavailable'], 502);
        }

        $text = $response->json('choices.0.message.content');
        $text = trim(preg_replace('/^json|$/m', '', trim($text)));
        $data = json_decode($text, true);

        if (!isset($data['description'])) {
            Log::error('Could not parse AI response', ['raw' => $text]);
            return response()->json(['error' => 'Could not parse AI response'], 502);
        }

        return response()->json([
            'description' => $data['description'],
            'price' => $data['price'] ?? null,
        ]);
    }
}
