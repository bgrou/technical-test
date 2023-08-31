<?php

namespace App\DTO\Turbine;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Turbine\TurbineStoreRequest;
use Illuminate\Support\Facades\Date;

class CreateTurbineDTO
{
    public function __construct(
        public readonly int $farm_id,
        public readonly int $manufacturer_id,
        public readonly float $capacity,
        public readonly bool $is_active,
        public readonly string $started_at
    ) {}

    public static function makeFromRequest(TurbineStoreRequest $request): self
    {
        return new self(
            $request->farm_id,
            $request->manufacturer_id,
            $request->capacity,
            $request->is_active,
            $request->started_at
        );
    }
}
