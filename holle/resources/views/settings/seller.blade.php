@extends('layouts.settings')
@section('settings')
    <div class="settingstitle">
        <h1>Become a seller?</h1>
    </div>
    <form method="POST" class="settingscontent">
        @if ($errors->any())
            <div class="error">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div class="settingsname">
            <div style="margin-bottom: 20px">
                <label for="agree">Agree to terms and legalese</label>
                <input type="checkbox" name="agree" id="agree">
            </div>
            <button type="submit">Become a seller</button>
        </div>
    </form>
    {{-- Change between become seller and seller settings if user is seller or not --}}
@endsection