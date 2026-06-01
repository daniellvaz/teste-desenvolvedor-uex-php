<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class DeleteContactController extends Controller
{
    public function __invoke(Request $request, Contact $contact): JsonResponse
    {
        try {
            // Get password from request body or query string
            $password = $request->input('password') ?? $request->query('password');

            if (!$password) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validação falhou',
                    'errors' => [
                        'password' => ['A senha é obrigatória'],
                    ],
                ], 422);
            }

            // Validate password
            if (!Hash::check($password, $request->user()->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validação falhou',
                    'errors' => [
                        'password' => ['A senha fornecida está incorreta'],
                    ],
                ], 422);
            }

            $contact->delete();

            return response()->json([
                'success' => true,
                'message' => 'Contato deletado com sucesso',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao deletar contato',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
