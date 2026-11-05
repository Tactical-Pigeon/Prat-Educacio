<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ServiceCard extends Component
{
    // TODO make it not complain
    public $service, $cover; 
    /**
     * Create a new component instance.
     */
    public function __construct($service) {
        $this->service = $service;

        $this->cover = $service->media->where('cover', 1)->value("url");
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.service-card');
    }
}
