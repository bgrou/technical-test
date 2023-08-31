<?php

namespace App\DTO\Turbine;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Turbine\TurbineUpdateRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Date;

class UpdateTurbineDTO
{
    public function __construct(
        public readonly int $id,
        public readonly int $farm_id,
        public readonly int $manufacturer_id,
        public readonly float $capacity,
        public readonly bool $is_active,
        public readonly string $started_at
    ) {}

    public static function makeFromRequest(TurbineUpdateRequest $request): self
    {
        return new self(
            $request->id,
            $request->farm_id,
            $request->manufacturer_id,
            $request->capacity,
            $request->is_active,
            $request->started_at
        );
    }
}
