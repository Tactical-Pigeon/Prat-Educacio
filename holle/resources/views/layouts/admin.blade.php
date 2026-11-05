@extends('layouts.main')
@php
    $disableNavbar = true;
@endphp
@section('content')
    <h1>Holle Admin!</h1>
    <ul>
        <li><a href="/admin">Dash</a></li>
        {{-- <li><a href="/admin/carousel">Carousel</a></li> --}}
        <li><a href="/admin/services">Services</a></li>
        <li><a href="/admin/users">Users</a></li>
        <li><a href="/">Back to home</a></li>
    </ul>
    @yield('admin')
@endsection
