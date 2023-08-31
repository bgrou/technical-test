<?php

namespace App\DTO\Manufacturer;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Manufacturer\ManufacturerUpdateRequest;
use Illuminate\Support\Facades\Date;

class UpdateManufacturerDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly ?string $phone_number,
        public readonly ?string $email,
        public readonly ?string $address,
    ) {}

    public static function makeFromRequest(ManufacturerUpdateRequest $request): self
    {
        return new self(
            $request->id,
            $request->name,
            $request->phone_number,
            $request->email,
            $request->address
        );
    }
}
