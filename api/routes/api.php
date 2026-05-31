<?php

use App\Http\Controllers\Api\Public\LoginController;
use App\Http\Controllers\Api\Public\RegisterController;
use Illuminate\Support\Facades\Route;

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);

// Route::post('/forgot-password', ForgotPasswordController::class);
// Route::post('/reset-password', ResetPasswordController::class);

// Route::middleware('auth:sanctum')->group(function () {

//     Route::apiResource('contacts', ContactController::class);

//     Route::get('/address/search', AddressController::class);

//     Route::delete('/account', DeleteAccountController::class);

//     Route::post('/logout', LogoutController::class);
// });
