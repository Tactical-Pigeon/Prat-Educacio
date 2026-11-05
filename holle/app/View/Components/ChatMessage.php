<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ChatMessage extends Component
{
    // TODO make it not complain 2
    public $message;
    /**
     * Create a new component instance.
     */
    public function __construct($message)
    {
        $this->message = $message;

    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.chat-message');
    }
}
