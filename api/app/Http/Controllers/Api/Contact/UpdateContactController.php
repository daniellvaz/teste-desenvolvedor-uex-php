<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class UpdateContactController extends Controller
{
    public function __invoke(UpdateContactRequest $request, Contact $contact): JsonResponse
    {
        try {
            $contact->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Contato atualizado com sucesso',
                'data' => $contact,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar contato',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
