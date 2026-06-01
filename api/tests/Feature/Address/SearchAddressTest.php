<?php

namespace Tests\Feature\Address;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SearchAddressTest extends TestCase
{
    public function test_should_search_address_by_valid_cep()
    {
        Http::fake([
            'https://viacep.com.br/ws/01310100/json/' => Http::response([
                'cep' => '01310-100',
                'logradouro' => 'Avenida Paulista',
                'bairro' => 'Bela Vista',
                'localidade' => 'São Paulo',
                'uf' => 'SP',
            ]),
        ]);

        $response = $this->getJson('/api/address/search?cep=01310100');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'cep' => '01310-100',
                    'street' => 'Avenida Paulista',
                    'neighborhood' => 'Bela Vista',
                    'city' => 'São Paulo',
                    'state' => 'SP',
                ],
            ]);
    }

    public function test_should_search_address_with_formatted_cep()
    {
        Http::fake([
            'https://viacep.com.br/ws/01310100/json/' => Http::response([
                'cep' => '01310-100',
                'logradouro' => 'Avenida Paulista',
                'bairro' => 'Bela Vista',
                'localidade' => 'São Paulo',
                'uf' => 'SP',
            ]),
        ]);

        $response = $this->getJson('/api/address/search?cep=01310-100');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'cep' => '01310-100',
                ],
            ]);
    }

    public function test_should_reject_when_cep_is_empty()
    {
        $response = $this->getJson('/api/address/search?cep=');

        $response->assertStatus(422)
            ->assertJsonValidationErrors('cep');
    }

    public function test_should_reject_when_cep_is_missing()
    {
        $response = $this->getJson('/api/address/search');

        $response->assertStatus(422)
            ->assertJsonValidationErrors('cep');
    }

    public function test_should_return_404_when_cep_not_found()
    {
        Http::fake([
            'https://viacep.com.br/ws/12345678/json/' => Http::response([
                'erro' => true,
            ]),
        ]);

        $response = $this->getJson('/api/address/search?cep=12345678');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'CEP não encontrado',
            ]);
    }

    public function test_should_return_400_when_cep_has_invalid_length()
    {
        $response = $this->getJson('/api/address/search?cep=123');

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'CEP deve conter exatamente 8 dígitos',
            ]);
    }

    public function test_should_handle_viacep_timeout()
    {
        Http::fake([
            'https://viacep.com.br/ws/01310100/json/' => Http::response([], 500),
        ]);

        $response = $this->getJson('/api/address/search?cep=01310100');

        $response->assertStatus(500)
            ->assertJson([
                'success' => false,
            ]);
    }
}
