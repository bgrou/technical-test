<?php

namespace App\DTO\Farm;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Farm\FarmUpdateRequest;
use Illuminate\Support\Facades\Date;

class UpdateFarmDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly float $latitude,
        public readonly float $longitude,
    ) {}

    public static function makeFromRequest(FarmUpdateRequest $request): self
    {
        return new self(
            $request->id,
            $request->name,
            $request->latitude,
            $request->longitude
        );
    }
}
