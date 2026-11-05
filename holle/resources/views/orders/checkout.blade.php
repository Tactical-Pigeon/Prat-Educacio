@extends('layouts.main')
@section('content')
    {{-- insert generic checkout screen here :3 --}}
    {{-- i'm copying prestashop a bit --}}
    <form method="post">
        @csrf
        <input type="hidden" name="seller" value="{{ $service->seller->username }}">
        <input type="hidden" name="service" value="{{ $service->slug }}">

        {{-- left details --}}
        <p>Service: {{ $service->title }}</p>
        <p>By: {{ $seller->name }}</p>
        <p>some more text here, idk</p>
        <br>

        @switch($step)
            @case(1)
                <h2>1</h2>
                <label for="message">Message to seller</label>
                <textarea name="message" id="message" cols="30" rows="10" required></textarea>
            @break

            @case(2)
                <input type="hidden" name="order" value="{{ $order->id }}">
                <h2>2</h2>
                <p>Select payment method</p>
                <button type="submit" name="pay" value="subpolygon">Subpolygon Pay</button>
                <button type="submit" name="pay" value="redsys">Card (Redsys)</button>
            @break

            @default
                <h1>An error has occured, please try again</h1>
        @endswitch





        {{-- right price --}}
        <p>{{ $service->price }}€</p>

        @if ($step == 1)
            <button type="submit">Create order and proceed to payment</button>
        @endif

    </form>
@endsection
