<?php

namespace App\Services;

use App\DTO\Manufacturer\CreateManufacturerDTO;
use App\DTO\Manufacturer\UpdateManufacturerDTO;
use App\Helpers\DataTable\DataTableHelper;
use App\Http\Resources\ManufacturerResource;
use App\Models\Manufacturer;
use App\Repositories\ManufacturerRepository;
use Illuminate\Http\Request;

class ManufacturerService
{
    public function __construct(
        protected ManufacturerRepository $repository
    ) {}

    public function create(CreateManufacturerDTO $dto)
    {
        return $this->repository->create($dto);
    }

    public function fetchIndex(Request $request, Manufacturer $manufacturer)
    {
        $allowedFields = ['name', 'phone_number', 'email', 'address'];
        $manufacturers = DataTableHelper::fetchData($request, $manufacturer, 'id', 'desc', ['components', 'turbines'], $allowedFields);

        return ManufacturerResource::collection($manufacturers);
    }

    public function update(UpdateManufacturerDTO $dto)
    {
        return $this->repository->update($dto);
    }

    public function find($id)
    {
        return $this->repository->find($id);
    }

    public function findWithAssociations($id)
    {
        return $this->repository->findWithAssociations($id);
    }
}
