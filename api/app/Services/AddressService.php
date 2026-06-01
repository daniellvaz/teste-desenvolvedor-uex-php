<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;

class AddressService
{
    private const VIACEP_BASE_URL = 'https://viacep.com.br/ws';

    public static function searchByCep(string $cep): array
    {
        $cep = preg_replace('/\D/', '', $cep);

        if (strlen($cep) !== 8) {
            throw new Exception('CEP deve conter exatamente 8 dígitos', 400);
        }

        try {
            $response = Http::timeout(5)->get(
                self::VIACEP_BASE_URL . '/' . $cep . '/json/'
            );

            if ($response->failed()) {
                throw new Exception('Falha ao consultar ViaCEP', 500);
            }

            $data = $response->json();

            if (isset($data['erro']) && $data['erro']) {
                throw new Exception('CEP não encontrado', 404);
            }

            return [
                'success' => true,
                'data' => [
                    'cep' => $data['cep'],
                    'street' => $data['logradouro'],
                    'neighborhood' => $data['bairro'],
                    'city' => $data['localidade'],
                    'state' => $data['uf'],
                ],
            ];
        } catch (Exception $e) {
            throw $e;
        }
    }
}
