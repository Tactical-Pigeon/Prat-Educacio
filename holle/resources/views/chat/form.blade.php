@extends('layouts.main')
@section('content')
    <form action="/chat/new" method="post">
        <input type="text" name="seller" id="seller" value="{{ $request->seller }}" readonly>
        <input type="text" name="service" id="seller" value="{{ $request->service }}" readonly>
        <br>
        <textarea name="message" id="message" cols="30" rows="10"></textarea>

        <button type="submit">Submit</button>
    </form>
@endsection
