<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeleteContactRequest;
use App\Models\Contact;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class DeleteContactController extends Controller
{
    /**
     * Deletar um contato existente
     *
     * @param Contact $contact
     * @param DeleteContactRequest $request
     *
     * @return JsonResponse
     */
    #[Group('Contact')]
    public function __invoke(DeleteContactRequest $request, Contact $contact): JsonResponse
    {
        try {
            if (!Hash::check($request->input('password'), $request->user()->password)) {
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
