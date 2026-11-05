<div class="{{ $message->sender->id === auth()->id() ? 'p1' : 'p2' }}">
    <div>
        <p>
            {{ $message->message }}
        </p>

        {{-- TODO, optimize this, crimes are being commited here --}}
        @foreach ($message->media as $media)
            @php
                // i like this <3
                $url = Storage::temporaryUrl($media->url, now()->plus(minutes: 5));
            @endphp
            @switch($media->type)
                @case(1)
                    <img src="{{ $url }}">
                @break

                @case(2)
                    <video width="320" height="240" controls>
                        <source src="{{ $url }}">
                    </video>
                @break

                @default
                    <p>Unsupported media type</p>
            @endswitch
        @endforeach
    </div>
</div>
