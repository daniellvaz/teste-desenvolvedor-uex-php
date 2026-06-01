<?php

namespace App\Http\Controllers\Api\Address;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchAddressRequest;
use App\Services\AddressService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Exception;

class SearchAddressController extends Controller
{
    /**
     * Rota para busca de endereço por CEP
     * Integração feita com o ViaCep
     *
     * @param SearchAddressRequest $request
     * @return JsonResponse
     */
    #[Group('Address')]
    public function __invoke(SearchAddressRequest $request): JsonResponse
    {
        try {
            $result = AddressService::searchByCep($request->input('cep'));

            return response()->json($result, 200);
        } catch (Exception $e) {
            $statusCode = $e->getCode() ?: 500;

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }
}
