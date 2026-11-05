@extends('layouts.seller')
@section('seller')

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
            <th>Client</th>
            <th>Service</th>
            <th>Status</th>
            <th>Price</th>
            <th>Created</th>
        </tr>

        @foreach ($orders as $order)
            
            <tr>
                <td>{{ $order->client->name }}</td>
                <td>{{ $order->service->title }}</td>
                <td><p title="{{ $order->status->description }}">{{ $order->status->name }}</p></td>
                <td>{{ $order->amount }}€</td>
                <td>{{ $order->created_at }} ({{$order->created_at->diffForHumans();}})</td>
            </tr>
        @endforeach


    </table>
@endsection
