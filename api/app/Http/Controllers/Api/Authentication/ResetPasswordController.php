<?php

namespace App\Http\Controllers\Api\Authentication;

use App\Models\User;
use App\Models\PasswordReset;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Controllers\Controller;

class ResetPasswordController extends Controller
{
    public function __invoke(ResetPasswordRequest $request)
    {
        try {
            // Encontrar o token de reset
            $passwordReset = PasswordReset::where('token', $request->token)
                ->where('expires_at', '>=', now())
                ->first();

            if (!$passwordReset) {
                return response()->json([
                    'message' => 'Token de reset inválido ou expirado.'
                ], 422);
            }

            // Verificar se o email corresponde ao usuário
            $user = User::find($passwordReset->user_id);

            if ($user->email !== $request->email) {
                return response()->json([
                    'message' => 'Email não corresponde ao token fornecido.'
                ], 422);
            }

            // Atualizar a senha
            $user->update([
                'password' => $request->password,
            ]);

            // Remover o token de reset
            $passwordReset->delete();

            // Remover todos os tokens de autenticação do usuário
            $user->tokens()->delete();

            return response()->json([
                'message' => 'Senha resetada com sucesso. Por favor, faça login com sua nova senha.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao resetar a senha.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
