<?php

namespace App\Repositories;

use App\DTO\Turbine\CreateTurbineDTO;
use App\DTO\Turbine\UpdateTurbineDTO;
use App\Models\Turbine;

class TurbineRepository
{
    public function __construct(
        protected Turbine $turbine
    ) {
    }

    public function getAll(string $filterField = null, string $filterValue = null): object
    {
        return (object) $this->turbine
            ->where(function ($query) use ($filterField, $filterValue) {
                if ($filterField) {
                    $query->where($filterField, 'like', "%{$filterValue}%");
                }
            })
            ->get()
            ->toArray();
    }

    public function create(CreateTurbineDTO $dto): object
    {
        $turbine = $this->turbine->create(
            (array)$dto
        );
        return (object)$turbine->toArray();
    }

    public function find($id): ?object
    {
        $turbine = $this->turbine->find($id);

        if (!$turbine) {
            return null;
        }

        return (object)$turbine->toArray();
    }

    public function update(UpdateTurbineDTO $dto): ?object
    {
        if (!$turbine = $this->turbine->find($dto->id)) {
            return null;
        }

        $turbine->update(
            (array)$dto
        );
        return (object)$turbine->toArray();
    }

    public function findWithAssociations($id): ?object
    {
        $turbine = $this->turbine->with(
            'farm',
            'manufacturer',
            'components',
            'components.inspections',
            'components.latestInspection'
        )
            ->find($id);

        if (!$turbine) {
            return null;
        }

        return (object)$turbine->toArray();
    }

    public function getAllWithIdAndName()
    {
        return $this->turbine->select('id', 'name')->get()->toArray();
    }

    public function delete($id)
    {
        $turbine = $this->turbine->findOrFail($id);
        $turbine->delete();
    }

    public function hasComponentOfType($turbineId, $type)
    {
        return Turbine::where('id', $turbineId)
            ->whereHas('components', function ($query) use ($type) {
                $query->where('type', $type);
            })->exists();
    }

    public function getComponentsWithLatestInspection($id): ?object
    {
        $turbine = $this->turbine->with(

            'components',
            'components.latestInspection'
        )
            ->find($id);

        if (!$turbine) {
            return null;
        }

        return (object)$turbine->toArray();
    }

}
