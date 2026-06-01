<?php

namespace App\Http\Controllers\Api\Authentication;

use App\Models\User;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Controllers\Controller;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    public function __invoke(ForgotPasswordRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Se este email existir em nossa plataforma, você receberá um link de reset de senha.'
                ], 200);
            }

            // Limpar tokens anteriores expirados
            PasswordReset::where('user_id', $user->id)
                ->where('expires_at', '<', now())
                ->delete();

            // Criar novo token
            $token = Str::random(64);

            PasswordReset::create([
                'user_id' => $user->id,
                'token' => $token,
                'expires_at' => now()->addHour(),
            ]);

            // Enviar email com link de reset
            $resetUrl = config('app.frontend_url') . "/reset-password?token={$token}&email={$user->email}";

            Mail::send('emails.password-reset', ['resetUrl' => $resetUrl], function ($message) use ($user) {
                $message->to($user->email)->subject('Reset de Senha');
            });

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
