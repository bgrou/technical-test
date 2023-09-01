<?php

namespace App\Http\Requests\Inspection;

use App\Enums\InspectionTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InspectionUpdateRequest extends FormRequest
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
            'user_id' => 'required|integer|exists:users,id',
            'grade' => 'required|digits_between:1,5',
            'type' => ['required', Rule::in(InspectionTypeEnum::values())],
            'date' => 'required|date',
            'notes' => 'nullable|max:250',
            'req_maintenance' => 'nullable|max:250'
        ];
    }
}
