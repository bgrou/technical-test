<?php

namespace App\DTO\Farm;

use App\Http\Requests\Farm\FarmStoreRequest;

class CreateFarmDTO
{
    public function __construct(
        public readonly string $name,
        public readonly float $latitude,
        public readonly float $longitude,
    ) {}

    public static function makeFromRequest(FarmStoreRequest $request): self
    {
        return new self(
            $request->name,
            $request->latitude,
            $request->longitude
        );
    }
}
