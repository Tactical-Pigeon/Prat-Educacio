@extends('layouts.settings')
@section('settings')
    <div class="settingstitle">
        <h1>{{ $user->username }}'s Account</h1>
    </div>
    <form method="post" enctype="multipart/form-data" class="settingscontent">
        @csrf
        <a class="settingspfp">
            <img src="{{ isset($user->pfp_url) ? $user->pfp_url : '/img/pigeon-spinning.gif' }}" alt="Profile picture">
        </a>

        <input id="pfp" type="file" name="pfp" id="pfp" accept="image/*" hidden>

        <br>
        <div class="settingsname">
            {{-- <label for="username">Username</label>
            <input type="text" name="username" id="username" value="{{ $user->username }}" readonly>
            <br> --}}
            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="{{ $user->name }}">
            <br>
            {{-- Sign in to other option and password change if email and password --}}
            <input type="submit" value="Save"> {{-- Cancel button when something is changed --}}
        </div>
        {{-- <label for="pfp">Profile Picture (upload to change)</label>
        <br> --}}
    </form>
@endsection
