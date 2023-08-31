<?php

namespace App\Repositories;

use App\DTO\Inspection\CreateInspectionDTO;
use App\DTO\Inspection\UpdateInspectionDTO;
use App\Models\Inspection;

class InspectionRepository
{
    public function __construct(
        protected Inspection $inspection
    ){}

    public function getAll(string $filterField = null, string $filterValue = null): array
    {
        return $this->inspection
                    ->where(function ($query) use ($filterField, $filterValue) {
                        if ($filterField) {
                            $query->where($filterField, 'like', "%{$filterValue}%");
                        }
                    })
                    ->get()
                    ->toArray();
    }

    public function create(CreateInspectionDTO $dto): object
    {
        $inspection = $this->inspection->create(
            (array) $dto
        );
        return (object) $inspection->toArray();
    }

    public function find($id): ?object
    {
        $inspection = $this->inspection->find($id);

        if (!$inspection) {
            return null;
        }

        return (object) $inspection->toArray();
    }

    public function update(UpdateInspectionDTO $dto): ?object
    {
        if (!$inspection = $this->inspection->find($dto->id)) {
            return null;
        }

        $inspection->update(
            (array) $dto
        );

        return (object) $inspection->toArray();
    }

    public function delete($id)
    {
        $inspection = $this->inspection->findOrFail($id);
        $inspection->delete();
    }

    public function findWithAssociations($id)
    {
        $inspection = $this->inspection->with('component', 'user')->find($id);

        if (!$inspection) {
            return null;
        }

        return (object) $inspection->toArray();
    }

}
