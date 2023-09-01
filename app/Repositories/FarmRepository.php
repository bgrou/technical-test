<?php

namespace App\Repositories;

use App\DTO\Farm\CreateFarmDTO;
use App\DTO\Farm\UpdateFarmDTO;
use App\Models\Farm;
use Illuminate\Database\Eloquent\Collection;

class FarmRepository
{
    public function __construct(
        protected Farm $farm
    ) {
    }

    public function getAll(string $filterField = null, string $filterValue = null): array
    {
        return $this->farm
            ->where(function ($query) use ($filterField, $filterValue) {
                if ($filterField) {
                    $query->where($filterField, 'like', "%{$filterValue}%");
                }
            })
            ->get()
            ->toArray();
    }

    public function create(CreateFarmDTO $dto): object
    {
        $farm = $this->farm->create(
            (array)$dto
        );
        return (object)$farm->toArray();
    }

    public function find($id): ?object
    {
        $farm = $this->farm->find($id);

        return $farm ? (object)$farm->toArray() : null;
    }

    public function update(UpdateFarmDTO $dto): ?object
    {
        $farm = $this->farm->find($dto->id);

        if (!$farm) {
            return null;
        }

        $farm->update(
            (array)$dto
        );

        return (object)$farm->toArray();
    }

    public function delete($id): void
    {
        $farm = $this->farm->findOrFail($id);
        $farm->delete();
    }

    public function findWithAssociations($id): ?object
    {
        $farm = $this->farm->with('turbines', 'currentWind')->find($id);

        return $farm ? (object)$farm->toArray() : null;
    }

    public function getTurbines($id): ?object
    {
        $farm = $this->farm->find($id);

        return $farm ? (object)$farm->turbines->toArray() : null;
    }

    public function getAllWithAssociations(): Collection|array
    {
        return $this->farm->with('turbines')->get()->toArray();
    }

    public function getAllIdsAndNames(): array
    {
        return $this->farm->select('id', 'name')->get()->toArray();
    }
}
