<?php

namespace App\Http\Requests\Component;

use App\Enums\ComponentTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ComponentStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', Rule::in(ComponentTypeEnum::values())],
            'turbine_id' => 'required|integer|exists:turbines,id',
            'manufacturer_id' => 'required|integer|exists:manufacturers,id',
            'serial_number' => 'required|string|unique:components,serial_number',
        ];
    }
}
