<?php

namespace App\DTO\Inspection;

use App\Enums\ComponentGradeEnum;
use App\Enums\InspectionTypeEnum;
use App\Http\Requests\Inspection\InspectionUpdateRequest;
use DateTime;
use Illuminate\Support\Facades\Date;
use Carbon\Carbon;

class UpdateInspectionDTO
{
    public function __construct(
        public readonly int $id,
        public readonly int $user_id,
        public readonly string $type,
        public readonly string $grade,
        public readonly string $date,
        public readonly ?string $notes
    ) {}

    public static function makeFromRequest(InspectionUpdateRequest $request): self
    {
        return new self(
            $request->id,
            $request->user_id,
            $request->type,
            $request->grade,
            $request->date,
            $request->notes
        );
    }
}
