@extends('layouts.seller')
@section('seller')
    <form method="post" id="create">
        {{-- TODO, this could be a popup --}}
        @csrf
        <label for="title">Title: </label>
        <input type="text" name="title" id="title">

        <button type="submit">Create!</button>
    </form>
@endsection
