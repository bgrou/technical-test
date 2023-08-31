<?php

namespace App\DTO\Manufacturer;

use App\Enums\ComponentGradeEnum;
use App\Http\Requests\Manufacturer\ManufacturerStoreRequest;
use Illuminate\Support\Facades\Date;

class CreateManufacturerDTO
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $phone_number,
        public readonly ?string $email,
        public readonly ?string $address,
    ) {}

    public static function makeFromRequest(ManufacturerStoreRequest $request): self
    {
        return new self(
            $request->name,
            $request->phone_number,
            $request->email,
            $request->address
        );
    }
}
