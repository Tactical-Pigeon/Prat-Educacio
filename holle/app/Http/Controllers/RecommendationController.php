<?php

namespace App\Http\Controllers;

use App\Models\CarouselImg;
use App\Models\Service;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function mainPage()
    {
        $featuredServices = Service::where("published", true)->where("featured", true)->orderBy('created_at', 'desc')->get();

        return view('welcome', ["featuredServices" => $featuredServices]);
    }
}
