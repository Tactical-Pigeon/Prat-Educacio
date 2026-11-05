<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MiscController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SettingsController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsSeller;
use Illuminate\Support\Facades\Route;

// auth
Route::view('/login', "auth.login")->name('login');
Route::post("/login", [LoginController::class, 'passwordLogin']);
Route::view('/signup', "auth.signup");
Route::post("/signup", [LoginController::class, 'passwordSignup']);

Route::get('/auth/{provider}/redirect', [LoginController::class, 'providerRedirect']);
Route::get('/auth/{provider}/callback', [LoginController::class, 'providerCallback']);
Route::get('/auth/logout', [LoginController::class, 'logout'])->name('logout');


// admin routes
Route::middleware([IsAdmin::class])->group(function () {
    Route::view("/admin", "admin.dash");

    Route::resource("/admin/users", UserController::class);
});


// normal pages
Route::get('/', [RecommendationController::class, "mainPage"]);

Route::get("/services", [ServiceController::class, "search"]);
Route::get("/services/{username}", [ServiceController::class, "indexSeller"]);
Route::get("/services/{username}/{slug}", [ServiceController::class, "show"]);


// logged in routes
Route::group(['middleware' => ['auth']], function () {
    // Temporary
    // Route::post("/chat/form", [ChatController::class, "create"]);
    // Route::post("/chat/form", [ChatController::class, "create"]);


    Route::get("/chat", [ChatController::class, "index"]);
    Route::post("/chat/new", [ChatController::class, "store"]);
    Route::get("/chat/{username}", [ChatController::class, "show"]);
    Route::post("/chat/{username}", [ChatController::class, "update"]);


    Route::get('/settings', [SettingsController::class, "account"]);
    Route::post('/settings', [SettingsController::class, "updateAccount"]);
    Route::get('/settings/seller', [SettingsController::class, "seller"]);
    Route::post('/settings/seller', [SettingsController::class, "sellerSubmit"]);
    Route::get('/settings/payment', [SettingsController::class, "payment"]);


    // i don't know how i feel about this routes
    Route::redirect('/orders/checkout', "/");
    Route::post('/orders/checkout', [OrderController::class, "checkout"]);
    Route::get('/orders/checkout/response', [OrderController::class, "paymentResponse"]);
});

// seller routes
Route::middleware([IsSeller::class])->group(function () {
    Route::get("/seller", [ServiceController::class, "dashboard"]);

    // services seller routes
    // Route::resource("/seller/services", ServiceController::class);
    Route::get("seller/services", [ServiceController::class, "index"]);
    Route::get("seller/services/create", [ServiceController::class, "create"]);
    Route::post("seller/services/create", [ServiceController::class, "store"]);
    Route::get("seller/services/{slug}", [ServiceController::class, "edit"]);
    Route::post("seller/services/{slug}", [ServiceController::class, "update"]);
    Route::post("seller/services/{slug}/ai-generate", [ServiceController::class, "generateAi"]);

    Route::get("seller/chat", [ChatController::class, "sellerIndex"]);
    Route::get("seller/chat/{username}", [ChatController::class, "sellerShow"]);
    Route::post("seller/chat/{username}", [ChatController::class, "sellerUpdate"]);

    Route::get("seller/orders", [OrderController::class, "sellerIndex"]);
});




// misc pages
Route::get("{slug}", [MiscController::class, "miscPage"]);
