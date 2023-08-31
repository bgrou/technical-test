<?php

namespace App\Actions;

use App\Repositories\ManufacturerRepository;

class GetAllManufacturersIdAndName
{
    public function __construct(
        protected ManufacturerRepository $repository
    ) {
    }

    public function execute(): array
    {
        return $this->repository->getAllIdAndName();
    }
}
