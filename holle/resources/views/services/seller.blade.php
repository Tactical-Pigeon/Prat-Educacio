@extends('layouts.main')
@section('content')
    <div class="sellerpage_information">
        <a {{-- href="/services/{{ $service->seller->username }}" --}}><img src="{{ isset($seller->pfp_url) ? $seller->pfp_url : '/img/pigeon-spinning.gif' }}">
        </a>
        <button>Contact me</button>
    </div>
    <div class="sellerpage_personalinformation">
        <div style="grid-area: From;">
            <p>From:</p>
            <p>Seller country</p>
        </div>
        <div style="grid-area: Since;">
            <p>Seller since:</p>
            <p>dte 6969</p>
        </div>
        <div style="grid-area: Languages;">
            <p>Languages:</p>
            <p>Seller Languages here</p>
        </div>
        <div class="line" style="grid-area: Hr;">
            <hr>
        </div>
        <div style="grid-area: desc;">
            Some personal description here
        </div>
    </div>
    <div class="sellercontent">
        @foreach ($services as $service)
            <x-service-card :service="$service" />
        @endforeach
    </div>
@endsection
