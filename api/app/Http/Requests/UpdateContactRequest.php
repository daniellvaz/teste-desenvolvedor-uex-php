<?php

namespace App\Http\Requests;

use App\Rules\ValidCpf;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'cpf' => ['sometimes', 'required', 'string', Rule::unique('contacts', 'cpf')->ignore($this->route('contact')), new ValidCpf()],
            'phone' => 'nullable|string|max:20|regex:/^\(\d{2}\)\s?\d{4,5}-\d{4}$/',
            'zipcode' => 'nullable|string|max:10|regex:/^\d{5}-?\d{3}$/',
            'street' => 'nullable|string|max:255',
            'number' => 'nullable|string|max:20',
            'complement' => 'nullable|string|max:255',
            'neighborhood' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|size:2|regex:/^[A-Z]{2}$/',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório',
            'name.string' => 'O nome deve ser texto',
            'name.max' => 'O nome não pode exceder 255 caracteres',
            'cpf.required' => 'O CPF é obrigatório',
            'cpf.string' => 'O CPF deve ser texto',
            'cpf.unique' => 'Este CPF já está cadastrado',
            'cpf_invalid' => 'O CPF informado é inválido',
            'phone.regex' => 'O telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
            'zipcode.regex' => 'O CEP deve estar no formato XXXXX-XXX',
            'state.regex' => 'O estado deve ser informado com 2 letras maiúsculas (UF)',
            'state.size' => 'O estado deve ter exatamente 2 caracteres',
            'latitude.numeric' => 'A latitude deve ser um número válido',
            'latitude.between' => 'A latitude deve estar entre -90 e 90',
            'longitude.numeric' => 'A longitude deve ser um número válido',
            'longitude.between' => 'A longitude deve estar entre -180 e 180',
        ];
    }
}
