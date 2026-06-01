<?php

namespace App\Http\Controllers\Api\Account;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\AccountCreatedMail;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    /**
     * Cadastro do usuário na plataforma
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
     #[Group('Account')]
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        Mail::to($user->email)->send(new AccountCreatedMail($user));

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
