<?php

namespace App\Http\Requests\Turbine;

use Illuminate\Foundation\Http\FormRequest;

class TurbineStoreRequest extends FormRequest
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
            'farm_id' => 'required|integer',
            'manufacturer_id' => 'required|integer',
            'capacity' => 'required|numeric',
            'is_active' => 'required|boolean',
            'started_at' => 'required|date'
        ];
    }
}
