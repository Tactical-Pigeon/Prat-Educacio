@extends('layouts.main')
@section('styles')
    <link rel="stylesheet" href="/styles/product.css">
@endsection
@section('content')
    <div class="productcontent">
        <h1>{{ $service->title }}</h1>
        <a class="userinfo" href="/services/{{ $service->seller->username }}">
            <img src="{{ isset($service->seller->pfp_url) ? $service->seller->pfp_url : '/img/pigeon-spinning.gif' }}"
                class="profilepicture">
            <p>{{ $service->seller->name }}</p>
        </a>
        <div class="middle">
            <div class="images">
                <div class="secondaryimages">
                    @forelse ($media as $mediaItem)
                        {{-- TODO, make work --}}
                        @switch($mediaItem->type)
                            @case(1)
                                <img class="secondaryimage" src="{{ $mediaItem->url }}" alt="{{ $mediaItem->alt }}">
                            @break

                            @case(2)
                                <img class="secondaryvideo" src="/img/play.webp" data-vid="{{ $mediaItem->url }}">
                            @break

                            @default
                                <p>Unsupported media type</p>
                        @endswitch
                        @empty
                            <img src="/img/pigeon-spinning.gif">
                        @endforelse
                    </div>
                    @if (isset($media[0]))
                        <img id="mainimage" src="{{ $media[0]->url }}" alt="{{ $media[0]->alt }}">
                    @else
                        <img src="/img/pigeon-spinning.gif">
                    @endif
                </div>
                <div class="checkout">
                    <div>
                        <form action="/orders/checkout" method="post">
                            @csrf
                            <input type="hidden" name="seller" value="{{ $service->seller->username }}">
                            <input type="hidden" name="service" value="{{ $service->slug }}">
                            <p><b>Basic</b></p>
                            <p>{{ $service->price }}€</p>
                            <button type="submit">Continue</button>
                        </form>
                    </div>
                    <button class="contactme">Contact me</button>
                </div>
            </div>
            <div class="sendmessage_popup">
                <h1>Sent a message</h1>
                <form action="/chat/new" method="post">
                    @csrf
                    <input type="hidden" name="seller" value="{{ $service->seller->username }}">
                    <input type="hidden" name="service" value="{{ $service->slug }}">
                    <br>
                    <textarea name="message" id="message" cols="30" rows="10"></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
            <div class="popup_grayish"></div>
            <h1>About this service</h1>
            <p>{{ $service->description }}</p>
        </div>
    @endsection
