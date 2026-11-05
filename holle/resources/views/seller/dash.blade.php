@extends('layouts.seller')
@section('seller')
    <div id="dashboard">
        <h1 style="color: #801fff;">Dashboard</h1>
        <div id="top-dashboard">
            <input type="text" placeholder="Search title">
            <div id="sort-dashboard">
                <p1 class="dashboard-p active-sort">Ascendent</p1>
                <p2 class="dashboard-p">Descendent</p2>
                <p>></p>
            </div>
            <input type="text" placeholder="Min €" style="width: 80px;">
            <p style="transform: translate(0px, -5px);">-</p> 
            <input type="text" placeholder="Max €"  style="width: 80px;"> 
            <button id="reset"></button>
            <a id="plus" href="/seller/services/create"></a>
        </div>
        <div id="left-dashboard">
            <div><h1>{{ number_format($stats['avgValue'], 2) }}€</h1><h2>Avarage Value</h2></div>
            <div><h1>{{ number_format($stats['minPrice'], 0) }}·{{ number_format($stats['maxPrice'], 0) }}€</h1><h2>Min-Max</h2></div>
            <div><h1>{{ $stats['totalServices'] }}</h1><h2>Total Services</h2></div>
            <div><h1>{{ $stats['activeServices'] }}</h1><h2>Active Services</h2></div>
            <div><h1>{{ $stats['sold'] }}</h1><h2>Sold</h2></div>
            <div><h1>{{ $stats['activeChats'] }}</h1><h2>Active chats</h2></div>
            <div><h1>{{ $stats['percentageSold'] }}%</h1><h2>Percentage sold</h2></div>
            <div id="statistic-dashboard"><h2>Price distribiution</h2></div>
            <div><h1>{{ number_format($stats['totalRevenue'], 2) }}€</h1><h2>Total Revenue</h2></div>
        </div>
        <div id="right-dashboard">
            @foreach ($services as $service)
                <x-service-card :service="$service" />
            @endforeach
        </div>
    </div>
    <script>
        $("#sort-dashboard").click(function () {
            $(".dashboard-p").toggleClass("active-sort");
            $("#sort-dashboard p").toggleClass("descendent-sort");
        });
    </script>
@endsection