<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class MiscController extends Controller
{
    public function miscPage(string $slug)
    {
        $view = "miscPages.".$slug;

        if (View::exists($view)) {
            return view($view);
        }

        abort(404);
    }
}
