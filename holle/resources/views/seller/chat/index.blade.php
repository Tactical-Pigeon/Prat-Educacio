@extends('layouts.seller')
@section('seller')
<div id="chat-div">
    {{-- left (all conversations) bar --}}
    <div id="conversations">
        @foreach ($conversations as $conv)
            <div>
                <a href="/seller/chat/{{ $conv->client->username }}">{{ $conv->client->name }}</a>

            </div>
        @endforeach
    </div>

    @if (isset($conversation))
        <h2>{{ $conversation->client->name }}</h2>

        <div id="conversation-div">
            <div>
                @foreach ($messages as $message)
                    <x-chat-message :message="$message" />
                @endforeach
            </div>
        </div>

        <form method="post" enctype="multipart/form-data" id="send">
            @csrf
            <input type="text" name="message" required>
            <label id="media-button" for="media"></label>
            <input type="file" name="media[]" id="media">
            <button type="submit"></button>

        </form>
    @else
        <p>No conversation selected</p>
    @endif
</div>
@endsection
