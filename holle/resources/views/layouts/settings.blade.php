@extends('layouts.main')

@section('content')
    <div class="settingsbody">
        <div class="settings">
            <ul class="settingscategories">
                <li><a href="/settings">Account</a></li>
                <li><a href="/settings/seller">Seller</a></li>

                {{-- <li><a href="/admin/users">Users</a></li>
                <li><a href="/">Back to home</a></li> --}}
            </ul>
            @yield('settings')
        </div>
    </div>
    {{-- i want it to look like an old ipad settings, menu on the left, page on the right --}}
@endsection
