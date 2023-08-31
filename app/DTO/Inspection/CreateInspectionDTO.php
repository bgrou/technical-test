<?php

namespace App\DTO\Inspection;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Inspection\InspectionStoreRequest;
use Illuminate\Support\Facades\Date;

class CreateInspectionDTO
{
    public function __construct(
        public readonly int $component_id,
        public readonly int $user_id,
        public readonly string $type,
        public readonly string $grade,
        public readonly string $date,
        public readonly ?string $notes
    ) {
    }

    public static function makeFromRequest(InspectionStoreRequest $request): self
    {
        return new self(
            $request->component_id,
            $request->user_id,
            $request->type,
            $request->grade,
            $request->date,
            $request->notes
        );
    }
}
