<?php

namespace App\Http\Controllers\Api\Address;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchAddressRequest;
use App\Services\AddressService;
use Illuminate\Http\JsonResponse;
use Exception;

class SearchAddressController extends Controller
{
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
