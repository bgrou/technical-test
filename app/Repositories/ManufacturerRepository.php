<?php

namespace App\Repositories;

use App\DTO\Manufacturer\CreateManufacturerDTO;
use App\DTO\Manufacturer\UpdateManufacturerDTO;
use App\Models\Manufacturer;

class ManufacturerRepository
{
    public function __construct(
        protected Manufacturer $manufacturer
    ){}

    public function getAll(string $filterField = null, string $filterValue = null): array
    {
        return $this->manufacturer
                    ->where(function ($query) use ($filterField, $filterValue) {
                        if ($filterField) {
                            $query->where($filterField, 'like', "%{$filterValue}%");
                        }
                    })
                    ->get()
                    ->toArray();
    }

    public function create(CreateManufacturerDTO $dto): object
    {
        $manufacturer = $this->manufacturer->create(
            (array) $dto
        );
        return (object) $manufacturer->toArray();
    }

    public function find($id): ?object
    {
        $manufacturer = $this->manufacturer->find($id);

        if (!$manufacturer) {
            return null;
        }

        return (object) $manufacturer->toArray();
    }

    public function update(UpdateManufacturerDTO $dto): ?object
    {
        if (!$manufacturer = $this->manufacturer->find($dto->id)) {
            return null;
        }

        $manufacturer->update(
            (array) $dto
        );

        return (object) $manufacturer->toArray();
    }

    public function delete($id)
    {
        $manufacturer = $this->manufacturer->findOrFail($id);
        $manufacturer->delete();
    }

    public function findWithAssociations($id)
    {
        $manufacturer = $this->manufacturer->with('turbines', 'components')->find($id);

        if (!$manufacturer) {
            return null;
        }

        return (object) $manufacturer->toArray();
    }

    public function getAllIdAndName(): array
    {
        return $this->manufacturer->select('id', 'name')->get()->toArray();
    }
}
