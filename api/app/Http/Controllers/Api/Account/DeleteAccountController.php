<?php

namespace App\Http\Controllers\Api\Account;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\DeleteAccountRequest;

class DeleteAccountController extends Controller
{
    /**
     * Deleta a conta do usuario
     *
     * @param DeleteAccountRequest $request
     * @return void
     */
    #[Group("Account")]
    public function __invoke(DeleteAccountRequest $request): JsonResponse
    {
        try {
            $user = $request->user();

            if (!Hash::check($request->input('password'), $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validação falhou',
                    'errors' => [
                        'password' => ['A senha fornecida está incorreta'],
                    ],
                ], 422);
            }

            User::destroy($user->id);

            return response()->json([
                'success' => true,
                'message' => 'Conta deletada com sucesso',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao deletar conta',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
