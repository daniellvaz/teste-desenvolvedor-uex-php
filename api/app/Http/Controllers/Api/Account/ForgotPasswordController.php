<?php

namespace App\Http\Controllers\Api\Account;

use App\Models\User;
use Illuminate\Support\Str;
use App\Models\PasswordReset;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\ForgotPasswordRequest;
use App\Mail\ForgotPasswordMail;
use Dedoc\Scramble\Attributes\Group;

class ForgotPasswordController extends Controller
{

    /**
     * Recuperação de senha do usuário
     *
     * @param ForgotPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
     #[Group('Account')]
    public function __invoke(ForgotPasswordRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Se este email existir em nossa plataforma, você receberá um link de reset de senha.'
                ], 200);
            }

            PasswordReset::where('user_id', $user->id)
                ->where('expires_at', '<', now())
                ->delete();

            $token = Str::random(64);

            PasswordReset::create([
                'user_id' => $user->id,
                'token' => $token,
                'expires_at' => now()->addHour(),
            ]);

            Mail::to($user->email)->queue(new ForgotPasswordMail($user, $token));

            return response()->json([
                'message' => 'Se este email existir em nossa plataforma, você receberá um link de reset de senha.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao processar solicitação de reset de senha.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
