<?php

use App\Http\Controllers\Api\Contact\ListOneContact;
use App\Http\Controllers\Api\Account\RegisterController;
use App\Http\Controllers\Api\Authentication\LoginController;
use App\Http\Controllers\Api\Contact\ListContactsController;
use App\Http\Controllers\Api\Authentication\LogoutController;
use App\Http\Controllers\Api\Account\DeleteAccountController;
use App\Http\Controllers\Api\Contact\CreateContactController;
use App\Http\Controllers\Api\Contact\UpdateContactController;
use App\Http\Controllers\Api\Contact\DeleteContactController;
use App\Http\Controllers\Api\Address\SearchAddressController;
use App\Http\Controllers\Api\Account\ResetPasswordController;
use App\Http\Controllers\Api\Account\ForgotPasswordController;

use Illuminate\Support\Facades\Route;

Route::post('/register', RegisterController::class);
Route::post('/forgot-password', ForgotPasswordController::class);
Route::post('/reset-password', ResetPasswordController::class);

Route::post('/login', LoginController::class);

Route::get('/address/search', SearchAddressController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contacts', ListContactsController::class);
    Route::get('/contacts/{contact}', ListOneContact::class);
    Route::post('/contacts', CreateContactController::class);
    Route::put('/contacts/{contact}', UpdateContactController::class);
    Route::patch('/contacts/{contact}', DeleteContactController::class);

    Route::delete('/account', DeleteAccountController::class);

    Route::delete('/logout', LogoutController::class);
});
