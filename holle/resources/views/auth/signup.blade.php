@extends('layouts.main')
@php
    $disableNavbar = true;
@endphp
@section('content')

    @if ($errors->any())
        <div class="error">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div id="body">
        <div>
            <a class="bigcenterlogo" href="/">
                <img src="/img/Holle_logo.png">
                <h1>HOLLE</h1>
            </a>
        </div>
        <div>
            <form id="form" method="POST">
                @csrf
                <h1>Sign up</h1>
                <div class="logintext">
                    <label for="email"><b>Enter email</b></label>
                </div>
                <input class="login" type="text" placeholder="Enter email" name="email" required>

                <div class="logintext">
                    <label for="name"><b>Enter name</b></label>
                </div>
                <input class="login" type="text" placeholder="Enter name" name="name" required>

                <div class="logintext">
                    <label for="psw"><b>Password</b></label>
                </div>
                <input class="login" type="password" placeholder="Enter Password" name="password" required>
                <input class="login" type="password" placeholder="Confirm Password" name="password_confirmation" required>



                <button type="submit">Sign Up!</button>
                <p>Already have an account? <a href="/login">Log In</a></p>

                <div id="separator">
                    <div></div>
                    <p>Or sign up with</p>
                    <div></div>
                </div>
                <div class="authicons">
                    <a href="/auth/authentik/redirect"><img src="/img/subpolygonlogo.png"></a>
                    <a href="/auth/google/redirect"><img src="/img/googlelogo.webp"></a>
                </div>
                <p class="tiny">By continuing, you agree to Holle's Terms of Use and Privacy Policy</p>
                <a></a>
            </form>
        </div>
    </div>
@endsection
