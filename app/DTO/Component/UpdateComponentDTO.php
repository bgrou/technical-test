<?php

namespace App\DTO\Component;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Component\ComponentUpdateRequest;
use Illuminate\Support\Facades\Date;

class UpdateComponentDTO
{
    public function __construct(
        public readonly int $id,
        public readonly int $manufacturer_id,
        public readonly string $serial_number
    ) {
    }

    public static function makeFromRequest(ComponentUpdateRequest $request): self
    {
        return new self(
            $request->id,
            $request->manufacturer_id,
            $request->serial_number
        );
    }
}
