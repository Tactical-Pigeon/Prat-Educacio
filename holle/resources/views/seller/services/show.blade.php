@extends('layouts.seller')
@section('seller')
    <form method="post" enctype="multipart/form-data" id="create">
        @csrf

        {{-- style this like the client page --}}
        <div id="create_title">
            <input type="text" name="title" id="title" value="{{ $service->title }}">
            <div><label for="title">Title:</label></div>
        </div>

        <div style="display: flex;" id="create_description">
            <div id="create_description_label"><label for="description">Description:</label></div>
            <textarea id="descrtiption" name="description" cols="30" rows="10" required>{{ $service->description }}</textarea>
            <div><button type="button" id="ai-generate-btn"></button></div>
        </div>

        <div id="create_title">
            <input type="number" name="price" id="price" step=".01" value="{{ $service->price }}">
            <div><label for="price">Price</label></div>
        </div>
        
        <div>
            <label for="published">Published</label>
            <input type="checkbox" name="published" id="published" {{ $service->published ? 'checked' : '' }}>
        </div>

        <div style="width: 80%;"><hr></div>
        {{-- image carousel here --}}
        @php
            $key = 0;
        @endphp
        <div id="service-images">
            @foreach ($service->media as $key => $mediaItem)
                <div class="service-images">
                    @switch($mediaItem->type)
                        @case(1)
                            <img src="{{ $mediaItem->url }}" alt="{{ $mediaItem->alt }}">
                        @break

                        @case(2)
                            <video width="320" height="240" controls>
                                <source src="{{ $mediaItem->url }}">
                            </video>
                        @break

                        @default
                            <p>Unsupported media type</p>
                    @endswitch
                    <br>
                    <label>Type: {{ $mediaItem->type }}</label>
                    <br>
                    <input type="hidden" name="mediaItem[{{ $key }}][id]" value="{{ $mediaItem->id }}">
                    <label for="pos">Position</label>
                    <input type="number" name="mediaItem[{{ $key }}][pos]" id="pos" min="0"
                        value="{{ $mediaItem->position }}">
                    <br>
                    <label for="alt">Alt text</label>
                    <input type="text" name="mediaItem[{{ $key }}][alt]" id="alt"
                        value="{{ $mediaItem->alt }}">
                    <br>
                    <label for="cover">Cover</label>
                    <input type="radio" name="cover" id="cover" value="{{ $mediaItem->id }}"
                        {{ $mediaItem->cover ? 'checked' : '' }}>
                    <br>
                    <label for="delete">Delete</label>
                    <input type="checkbox" name="mediaItem[{{ $key }}][delete]" id="delete">
                </div>
            @endforeach
        </div>        
        <br>
        <label for="media">Add media (video, images; multiple upload)</label>
        <br>
        {{-- ,audio/* --}}
        <input type="file" name="media[]" id="media" accept="image/*,video/*" multiple>

        <button type="submit">Save</button>
    </form>
    <script>
        document.getElementById('ai-generate-btn').addEventListener('click', async function () {
            const btn = this;
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Generating...';

            try {
                const token = document.querySelector('input[name="_token"]').value;
                const res = await fetch("{{ url('seller/services/' . $service->slug . '/ai-generate') }}", {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Accept': 'application/json',
                    },
                });
                const data = await res.json();

                if (data.description) {
                    document.getElementById('descrtiption').value = data.description;
                }
                if (data.price) {
                    document.getElementById('price').value = data.price;
                }
                if (data.error) {
                    alert(data.error);
                }
            } catch (e) {
                alert('Could not generate AI content, please try again.');
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    </script>
@endsection
