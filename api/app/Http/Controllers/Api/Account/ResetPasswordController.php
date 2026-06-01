<?php

namespace App\Http\Controllers\Api\Account;

use App\Models\User;
use App\Models\PasswordReset;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;
use App\Http\Requests\ResetPasswordRequest;

class ResetPasswordController extends Controller
{

    /**
     * Reset da senha do usuário
     *
     * @param ResetPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
     #[Group('Account')]
    public function __invoke(ResetPasswordRequest $request)
    {
        try {
            $passwordReset = PasswordReset::where('token', $request->token)
                ->where('expires_at', '>=', now())
                ->first();

            if (!$passwordReset) {
                return response()->json([
                    'message' => 'Token de reset inválido ou expirado.'
                ], 422);
            }

            $user = User::find($passwordReset->user_id);

            if ($user->email !== $request->email) {
                return response()->json([
                    'message' => 'Email não corresponde ao token fornecido.'
                ], 422);
            }
            $user->update([
                'password' => $request->password,
            ]);

            $passwordReset->delete();

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
