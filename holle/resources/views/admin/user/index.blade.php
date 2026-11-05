@extends('layouts.admin')
@section('admin')
    users

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
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Seller</th>
            <th>link</th>
        </tr>

        @foreach ($users as $user)
            <tr>
                <td>{{ $user->id }}</td>
                <td>{{ $user->name }}</td>
                <td>{{ $user->username }}</td>
                <td>{{ $user->email }}</td>
                <td>{{ $user->is_admin }}</td>
                <td>{{ $user->is_seller }}</td>
                <td><a href="/admin/user/{{ $user->id }}">Edit</a></td>
            </tr>
        @endforeach


    </table>
@endsection
