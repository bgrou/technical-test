<?php

namespace App\Http\Requests\Component;

use App\Enums\ComponentTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ComponentUpdateRequest extends FormRequest
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
            'id' => 'required|integer',
            'manufacturer_id' => 'required|integer|exists:manufacturers,id',
            'serial_number' => 'required|string|max:20|unique:components,serial_number',
        ];
    }
}
