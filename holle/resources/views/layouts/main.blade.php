<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Holle</title>

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Noto+Color+Emoji&display=swap"
        rel="stylesheet">


    <link rel="stylesheet" href="/styles/styles.css">
    @yield('styles')
</head>

<body>
    @empty($disableNavbar)
        <div class="navbar">
            <a class="logo" href="/">
                <img src="/img/Holle_logo.png" alt="Big chest pigeon logo">
                <h1>HOLLE</h1>
            </a>

            <form class="searchbar" action="/services">
                <input type="search" class="text" name="q" placeholder="Search the store">
                <input type="submit" class="button" value="">
            </form>
            @if (Auth::check())
                <div class="user">
                    {{-- <img style="z-index: 10" src="/img/user.svg" alt="user default logo"> --}}
                    <img style="z-index: 10"
                        src="{{ isset(Auth::user()->pfp_url) ? Auth::user()->pfp_url : '/img/pigeon-spinning.gif' }}"
                        alt="Profile picture">
                    {{-- TODO, make it stop blinking out of existance on page change --}}
                    <div class="usertext">
                        <p>Welcome, {{ Auth::user()->name }}</p>
                    </div>
                </div>
                <div id="userpopup" class="popup">
                    <div id="userpopupcontent">
                        {{-- TODO, i'm not sure calling the auth facade that much is good --}}

                        @if (Auth::user()->is_admin)
                            <a href="/admin">
                                <p>Admin panel</p>
                            </a>
                        @endif
                        @if (Auth::user()->is_seller)
                            <a href="/seller">
                                <p>Seller page</p>
                            </a>
                        @endif
                        {{-- why is the hr fucked up --}}
                        {{-- <a href="/{{ Auth::user()->username }}">
                            <p>Profile</p>
                        </a> --}}
                        <a href="/settings">
                            <p>Settings</p>
                        </a>
                        <a href="/auth/logout">
                            <p>Log Out</p>
                        </a>
                    </div>
                </div>
                <a class="purchases" href="/chat">
                    <div></div>
                </a>
            @else
                <a class="user" href="https://holle.tacticalpigeon.com/login"><img src="/img/user.svg"
                        alt="user default logo">
                    <div>
                        <p><b>Sign/Log in</b></p>
                    </div>
                </a>
            @endif
        </div>
    @endempty

    {{-- TODO, could easily convert to spa with htmx --}}
    @yield('content')

    <div class="footer">
        <div>
            <h1>Get to know us</h1>
            <a href="https://tacticalpigeon.com">
                <p>TacticalPigeon</p>
            </a>
            <a href="/about-us">
                <p>About us</p>
            </a>
            <a>
                <p>Contact us</p>
            </a>
        </div>
        <div>
            <h1>Make Money with Us</h1>
            <a href="/become-merchant">
                <p>Sell on Holle</p>
            </a>
            {{-- <a>
                <p>Host on Subpolygon</p>
            </a> --}}
        </div>
        <div>
            <h1>Holle Payment Methods</h1>
            <a href="/payment-methods#Pigeon-Trade">
                <p>Pigeon trade</p>
            </a>
            <a href="/gift-cards">
                <p>Gift cards</p>
            </a>
        </div>
    </div>

    <script src="/js/jquery-4.0.0.min.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/carousel.js"></script>
</body>

</html>
