@extends('layouts.seller')
@section('seller')
    <a href="/seller/services/create">Add new</a>


    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>

    <table>
        <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Price</th>
            <th>link</th>
        </tr>

        @foreach ($services as $service)
            <tr>
                <td>{{ $service->title }}</td>
                <td>{{ Str::slug($service->title, '-') . '-' . $service->id }}</td>
                <td>{{ $service->price }}</td>
                <td><a href="/seller/services/{{ $service->slug }}">Edit</a></td>
            </tr>
        @endforeach


    </table>
@endsection
