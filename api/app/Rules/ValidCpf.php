<?php

namespace App\Rules;

use App\Services\CpfValidationService;
use Illuminate\Contracts\Validation\Rule;

class ValidCpf implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return CpfValidationService::validate($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('validation.cpf_invalid');
    }
}
