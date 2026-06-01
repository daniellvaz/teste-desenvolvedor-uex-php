<?php

namespace Tests\Unit\Services;

use App\Services\AddressService;
use Exception;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AddressServiceTest extends TestCase
{
    public function test_should_search_address_with_valid_cep()
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

        $result = AddressService::searchByCep('01310100');

        $this->assertTrue($result['success']);
        $this->assertEquals('01310-100', $result['data']['cep']);
        $this->assertEquals('Avenida Paulista', $result['data']['street']);
        $this->assertEquals('Bela Vista', $result['data']['neighborhood']);
        $this->assertEquals('São Paulo', $result['data']['city']);
        $this->assertEquals('SP', $result['data']['state']);
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

        $result = AddressService::searchByCep('01310-100');

        $this->assertTrue($result['success']);
        $this->assertEquals('01310-100', $result['data']['cep']);
    }

    public function test_should_throw_exception_when_cep_has_invalid_length()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('CEP deve conter exatamente 8 dígitos');
        $this->expectExceptionCode(400);

        AddressService::searchByCep('123');
    }

    public function test_should_throw_exception_when_cep_not_found()
    {
        Http::fake([
            'https://viacep.com.br/ws/12345678/json/' => Http::response([
                'erro' => true,
            ]),
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('CEP não encontrado');
        $this->expectExceptionCode(404);

        AddressService::searchByCep('12345678');
    }

    public function test_should_throw_exception_when_http_fails()
    {
        Http::fake([
            'https://viacep.com.br/ws/01310100/json/' => Http::response([], 500),
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Falha ao consultar ViaCEP');

        AddressService::searchByCep('01310100');
    }
}
