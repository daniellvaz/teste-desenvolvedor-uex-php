<?php

namespace Tests\Unit\Services;

use App\Services\CpfValidationService;
use PHPUnit\Framework\TestCase;

class CpfValidationServiceTest extends TestCase
{
    /**
     * Testa a validação de CPFs válidos.
     */
    public function test_should_validate_valid_cpf_unformatted()
    {
        // CPF válido sem formatação
        $this->assertTrue(CpfValidationService::validate('11144477735'));
    }

    /**
     * Testa a validação de CPFs válidos formatados.
     */
    public function test_should_validate_valid_cpf_formatted()
    {
        // CPF válido com formatação
        $this->assertTrue(CpfValidationService::validate('111.444.777-35'));
    }

    /**
     * Testa a rejeição de CPFs com menos de 11 dígitos.
     */
    public function test_should_reject_cpf_with_less_than_11_digits()
    {
        $this->assertFalse(CpfValidationService::validate('1234567890'));
    }

    /**
     * Testa a rejeição de CPFs com mais de 11 dígitos.
     */
    public function test_should_reject_cpf_with_more_than_11_digits()
    {
        $this->assertFalse(CpfValidationService::validate('123456789012'));
    }

    /**
     * Testa a rejeição de CPFs com todos os dígitos iguais.
     */
    public function test_should_reject_cpf_with_all_equal_digits()
    {
        $this->assertFalse(CpfValidationService::validate('11111111111'));
        $this->assertFalse(CpfValidationService::validate('22222222222'));
        $this->assertFalse(CpfValidationService::validate('00000000000'));
    }

    /**
     * Testa a rejeição de CPFs com dígito verificador inválido.
     */
    public function test_should_reject_cpf_with_invalid_check_digit()
    {
        // CPF com dígitos verificadores incorretos
        $this->assertFalse(CpfValidationService::validate('11144477736'));
        $this->assertFalse(CpfValidationService::validate('11144477734'));
    }

    /**
     * Testa a formatação de CPF.
     */
    public function test_should_format_cpf_correctly()
    {
        $formatted = CpfValidationService::format('11144477735');
        $this->assertEquals('111.444.777-35', $formatted);
    }

    /**
     * Testa a remoção de formatação de CPF.
     */
    public function test_should_unformat_cpf_correctly()
    {
        $unformatted = CpfValidationService::unformat('111.444.777-35');
        $this->assertEquals('11144477735', $unformatted);
    }

    /**
     * Testa a validação com CPF vazio.
     */
    public function test_should_reject_empty_cpf()
    {
        $this->assertFalse(CpfValidationService::validate(''));
    }

    /**
     * Testa a validação com CPF contendo letras.
     */
    public function test_should_reject_cpf_with_letters()
    {
        $this->assertFalse(CpfValidationService::validate('111.444.777-3a'));
    }

    /**
     * Testa múltiplos CPFs válidos conhecidos.
     */
    public function test_should_validate_multiple_valid_cpfs()
    {
        $validCpfs = [
            '11144477735',
            '123.456.789-09',
            '111.444.777-35',
        ];

        foreach ($validCpfs as $cpf) {
            $this->assertTrue(
                CpfValidationService::validate($cpf),
                "CPF {$cpf} should be valid"
            );
        }
    }
}
