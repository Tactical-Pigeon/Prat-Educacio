<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function account()
    {
        $user = User::find(Auth::id());
        return view("settings.account", ["user" => $user]);
    }

    public function updateAccount(Request $request)
    {
        $user = User::find(Auth::id());

        // TODO, username change detection and pfp renaming

        if ($request->hasFile('pfp')) {
            $cover = $request->file('pfp');
            // TODO, input filtering
            $user->pfp_url = "/storage/" . Storage::disk('public')->putFile("pfp", $cover);
        }

        $user->name = $request->name;
        // $user->username = $request->username;

        $user->save();

        return redirect()->back();
    }

    public function seller()
    {
        return view("settings.seller");
    }
    public function sellerSubmit(Request $request)
    {
        $request->validate([
            'agree' => 'required',
        ]);
        $user = User::where("id", Auth::id())->first();
        $user->is_seller = 1;
        $user->save();
        return back();
    }
}
