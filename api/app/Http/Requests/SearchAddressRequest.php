<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cep' => 'required|string|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'cep.required' => 'O campo CEP é obrigatório',
            'cep.string' => 'O CEP deve ser uma string',
            'cep.min' => 'O CEP não pode estar vazio',
        ];
    }
}
