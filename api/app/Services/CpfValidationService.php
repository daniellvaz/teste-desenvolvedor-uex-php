<?php

namespace App\Services;

class CpfValidationService
{
    /**
     * Valida um CPF seguindo o algoritmo oficial.
     *
     * @param string $cpf CPF com ou sem formatação
     * @return bool True se o CPF é válido, false caso contrário
     */
    public static function validate(string $cpf): bool
    {
        // Remove caracteres não numéricos
        $cpf = preg_replace('/\D/', '', $cpf);

        // Verifica se tem 11 dígitos
        if (strlen($cpf) !== 11) {
            return false;
        }

        // Rejeita CPFs com todos os dígitos iguais
        if (preg_match('/^(\d)\1{10}$/', $cpf)) {
            return false;
        }

        // Valida o primeiro dígito verificador
        if (!self::validateFirstCheckDigit($cpf)) {
            return false;
        }

        // Valida o segundo dígito verificador
        if (!self::validateSecondCheckDigit($cpf)) {
            return false;
        }

        return true;
    }

    /**
     * Formata um CPF válido.
     *
     * @param string $cpf CPF sem formatação
     * @return string CPF formatado como XXX.XXX.XXX-XX
     */
    public static function format(string $cpf): string
    {
        $cpf = preg_replace('/\D/', '', $cpf);

        if (strlen($cpf) !== 11) {
            return $cpf;
        }

        return sprintf(
            '%s.%s.%s-%s',
            substr($cpf, 0, 3),
            substr($cpf, 3, 3),
            substr($cpf, 6, 3),
            substr($cpf, 9, 2)
        );
    }

    /**
     * Remove formatação de um CPF.
     *
     * @param string $cpf CPF com ou sem formatação
     * @return string CPF sem formatação
     */
    public static function unformat(string $cpf): string
    {
        return preg_replace('/\D/', '', $cpf);
    }

    /**
     * Valida o primeiro dígito verificador.
     *
     * @param string $cpf CPF sem formatação
     * @return bool
     */
    private static function validateFirstCheckDigit(string $cpf): bool
    {
        $sum = 0;
        $multiplier = 10;

        // Multiplica os 9 primeiros dígitos pela sequência 10, 9, 8, 7, 6, 5, 4, 3, 2
        for ($i = 0; $i < 9; $i++) {
            $sum += (int) $cpf[$i] * $multiplier;
            $multiplier--;
        }

        $remainder = $sum % 11;
        $firstCheckDigit = $remainder < 2 ? 0 : 11 - $remainder;

        return (int) $cpf[9] === $firstCheckDigit;
    }

    /**
     * Valida o segundo dígito verificador.
     *
     * @param string $cpf CPF sem formatação
     * @return bool
     */
    private static function validateSecondCheckDigit(string $cpf): bool
    {
        $sum = 0;
        $multiplier = 11;

        // Multiplica os 10 primeiros dígitos pela sequência 11, 10, 9, 8, 7, 6, 5, 4, 3, 2
        for ($i = 0; $i < 10; $i++) {
            $sum += (int) $cpf[$i] * $multiplier;
            $multiplier--;
        }

        $remainder = $sum % 11;
        $secondCheckDigit = $remainder < 2 ? 0 : 11 - $remainder;

        return (int) $cpf[10] === $secondCheckDigit;
    }
}
