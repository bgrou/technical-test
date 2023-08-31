<?php

namespace App\Repositories;

use App\DTO\Component\CreateComponentDTO;
use App\DTO\Component\UpdateComponentDTO;
use App\Models\Component;

class ComponentRepository
{
    public function __construct(
        protected Component $component
    ) {
    }

    public function getAll(string $filterField = null, string $filterValue = null): array
    {
        return $this->component
            ->where(function ($query) use ($filterField, $filterValue) {
                if ($filterField) {
                    $query->where($filterField, 'like', "%{$filterValue}%");
                }
            })
            ->get()
            ->toArray();
    }

    public function create(CreateComponentDTO $dto): object
    {
        $component = $this->component->create(
            (array)$dto
        );
        return (object)$component->toArray();
    }

    public function find($id): ?object
    {
        $component = $this->component->find($id);

        if (!$component) {
            return null;
        }

        return (object)$component->toArray();
    }

    public function update(UpdateComponentDTO $dto): ?object
    {
        if (!$component = $this->component->find($dto->id)) {
            return null;
        }

        $component->update(
            (array)$dto
        );

        return (object)$component->toArray();
    }

    public function delete($id)
    {
        $component = $this->component->findOrFail($id);
        $component->delete();
    }

    public function findWithAssociations($id)
    {
        $component = $this->component->with('manufacturer', 'inspections', 'turbine', 'latestInspection')->find($id);

        if (!$component) {
            return null;
        }

        return (object)$component->toArray();
    }
}
