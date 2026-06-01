<?php

namespace App\Http\Controllers\Api\Contact;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Dedoc\Scramble\Attributes\Group;
use App\Http\Requests\UpdateContactRequest;

class UpdateContactController extends Controller
{
    /**
     * Atualiza os dados de contato
     *
     * @param UpdateContactRequest $request
     * @param Contact $contact
     * @return JsonResponse
     */
     #[Group('Contact')]
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
