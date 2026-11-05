@extends('layouts.main')
@section('content')
    {{-- Event carousel --}}
    <div class="carouseldiv">
        <div class="carouselimgdiv">
            <a class="carousel"><img src="/img/carousel/Valentains_discount.webp"
                    alt="Valentains discount Up to 95% promotion"></a>
            <a class="carousel"><img src="/img/carousel/Wawelin.webp" alt="Halloween discount Up to 85% promotion"></a>
        </div>
        <a><img class="arrow" src="/img/carousel/leftarrow.svg" alt="leftarrow" onclick="carouselleft()"></a>
        <a><img class="arrow" src="/img/carousel/rightarrow.svg" alt="rightarrow" style="left: 94.5vw"
                onclick="carousel()"></a>
    </div>
    {{-- featured --}}
    <div class="featureddiv">
        <h1 style="margin-left: 40px">Featured</h1>
        <div class="featuredimgdiv">
            <a><img class="featuredarrow1 featuredarrow" src="/img/carousel/leftarrow.svg" alt="leftarrow" onclick="featuredleft()"></a>
            @foreach ($featuredServices as $featured)
                <a class="featuredcontentdiv {{ $loop->last ? 'secondaryfeaturedcontentdiv1' : '' }}{{ $loop->iteration == 1 ? 'mainfeaturedcontentdiv' : '' }}{{ $loop->iteration == 2 ? 'secondaryfeaturedcontentdiv2' : '' }}"
                    href="/services/{{ $featured->seller->username }}/{{ $featured->slug }}">
                    @php
                        $cover = $featured->media->where('cover', 1)->where('type', 1)->first();
                        $coverVid = $featured->media->where('cover', 1)->where('type', 2)->first();
                    @endphp
                    <div class="mainimagediv" {{ $cover ? 'data-img=' . $cover->url  : '' }} {{ $coverVid ? 'data-vid=' . $coverVid->url  : '' }}>
                        <img id="mainimage" src="{{ $cover->url }}" alt="{{ $cover->alt }}"
                            {{ $coverVid ? 'data-vid=' . $coverVid->url  : '' }}>
                    </div>
                    <div>
                        <h1 class="featuredtitle">{{ $featured->title }}</h1>
                        <div class="tinyimages">
                            @forelse ($featured->media->where("cover", false)->where('type', 1)->slice(0,4) as $mediaItem)
                                <img src="{{ $mediaItem->url }}" alt="{{ $mediaItem->alt }}">
                            @empty
                                <img src="/img/pigeon-spinning.gif">
                            @endforelse
                        </div>
                        <p>{{ $featured->price }}€</p>
                    </div>
                </a>
            @endforeach
            <a><img class="featuredarrow2 featuredarrow" src="/img/carousel/rightarrow.svg" alt="rightarrow" onclick="featured(true)"></a>
            {{-- <a class="featured"><img src="/img/carousel/Valentains_discount.webp" alt="Valentains discount Up to 95% promotion"></a>
        <a class="featured"><img src="/img/carousel/Wawelin.webp" alt="Halloween discount Up to 85% promotion"></a> --}}
        </div>
        {{-- <a><img class="featuredarrow" src="/img/carousel/leftarrow.svg" alt="leftarrow" onclick="carouselleft()"></a>
    <a><img class="featuredarrow" src="/img/carousel/rightarrow.svg" alt="rightarrow" style="left: 94.5vw" onclick="carousel()"></a> --}}
    </div>
    {{-- recommended --}}

    {{-- viewed services? --}}
@endsection
