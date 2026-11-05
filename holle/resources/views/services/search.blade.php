@extends('layouts.main')
@section('content')
    <div class="searchcontent">
    {{-- left search parameters bar --}}

    {{-- search items --}}
    @foreach ($services as $service)
        <x-service-card :service="$service"/>
    @endforeach
    {{-- TODO (later) search pagination --}}
    </div>
@endsection
