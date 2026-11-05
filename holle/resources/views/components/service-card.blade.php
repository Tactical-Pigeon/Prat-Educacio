<div class="servicecard">
    <a href="/services/{{ $service->seller->username }}/{{ $service->slug }}">
        <img src="{{ isset($cover) ? $cover : '/img/pigeon-spinning.gif' }}">
    </a>
    <div class="cardinfo">
        <a href="/services/{{ $service->seller->username }}"><img src="{{ isset($service->seller->pfp_url) ? $service->seller->pfp_url : '/img/pigeon-spinning.gif' }}">
            <p><b>{{ $service->seller->name }}</b></p>
        </a>
        <a href="/services/{{ $service->seller->username }}/{{ $service->slug }}">
            <p>{{ $service->title }}<br>{{ $service->price }}€</p>
        </a>
    </div>
</div>
