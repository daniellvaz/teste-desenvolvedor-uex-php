<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateContactRequest;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class CreateContactController extends Controller
{
    /**
     * Criar um novo contato para o usuário autenticado
     *
     * @param CreateContactRequest $request
     * @return JsonResponse
     */
    public function __invoke(CreateContactRequest $request): JsonResponse
    {
        try {
            $contact = Contact::create([
                ...$request->validated(),
                'user_id' => $request->user()->id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Contato criado com sucesso',
                'data' => $contact,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar contato',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
