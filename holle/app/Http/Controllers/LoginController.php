<?php

namespace App\Http\Controllers;

use App\Models\SocialAccount;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    // SSO (Subpolygon/Google)
    public function providerRedirect(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function providerCallback(string $provider)
    {

        $oauthuser = Socialite::driver($provider)->user();

        // create or use socialite
        $social = SocialAccount::firstOrNew([
            'oauth_id' => $oauthuser->id,
            'provider' => $provider
        ]);

        if ($social->exists) {
            Auth::login($social->user, true);
            return redirect()->intended('/');
        }

        // create user
        $user = User::firstOrNew([
            'email' => $oauthuser->email
        ]);
        if ($user->exists) {
            $errors = new MessageBag();
            $errors->add('user_exists', 'User account already exists, try logging in with a different provider');
            return view("auth.login")->with("errors", $errors);
        } else {
            $user->name = $oauthuser->name;
            $user->username = $oauthuser->preferred_username;
            // $user->password = bcrypt(str_random(30));
            if ($provider == "authentik") {
                $user->is_admin = in_array("authentik Admins", $oauthuser->groups, true);
            }
            $user->save();

            $social->user()->associate($user);
            $social->save();

            Auth::login($user, true);

            return redirect()->intended('/');
        }
    }


    // Email and password
    public function passwordLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }



    public function passwordSignup(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = User::create([
            'name' => $validated['name'],
            'username' => Str::kebab($validated['name']),
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Log them in
        Auth::login($user);

        // Redirect to home
        return redirect('/');
    }



    public function logout(Request $request)
    {
        Auth::logout();
        // auth()->guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
