<?php

namespace App\DTO\Component;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Component\ComponentStoreRequest;
use Illuminate\Support\Facades\Date;

class CreateComponentDTO
{
    public function __construct(
        public readonly string $type,
        public readonly int $turbine_id,
        public readonly int $manufacturer_id,
        public readonly string $serial_number
    ) {
    }

    public static function makeFromRequest(ComponentStoreRequest $request): self
    {
        return new self(
            $request->type,
            $request->turbine_id,
            $request->manufacturer_id,
            $request->serial_number
        );
    }
}
