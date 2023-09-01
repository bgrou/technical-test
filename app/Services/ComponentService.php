<?php

namespace App\Services;

use App\DTO\Component\CreateComponentDTO;
use App\DTO\Component\UpdateComponentDTO;
use App\Helpers\DataTable\DataTableHelper;
use App\Http\Resources\ComponentResource;
use App\Models\Component;
use App\Repositories\ComponentRepository;
use App\Repositories\TurbineRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;

class ComponentService
{
    public function __construct(
        protected ComponentRepository $repository,
        protected TurbineRepository $turbineRepository
    ) {
    }

    public function create(CreateComponentDTO $dto)
    {
        if ($this->turbineRepository->hasComponentOfType($dto->turbine_id, $dto->type)) {
            return null;
        } else {
            return $this->repository->create($dto);
        }
    }

    public function getAll(string $filterField = null, string $filterValue = null): array
    {
        return $this->repository->getAll($filterField, $filterValue);
    }

    public function fetchIndex(Request $request, Component $component): AnonymousResourceCollection
    {
        $allowedFields = ['id', 'type', 'turbine_id', 'manufacturer_id', 'serial_number'];
        $components = DataTableHelper::fetchData($request, $component, 'id', 'desc', [], $allowedFields);

        return ComponentResource::collection($components);
    }

    public function find($id): ?object
    {
        return $this->repository->find($id);
    }

    public function findWithAssociations($id): ?object
    {
        return $this->repository->findWithAssociations($id);
    }

    public function update(UpdateComponentDTO $dto): ?object
    {
        return $this->repository->update($dto);
    }

    public function delete($id): void
    {
        $this->repository->delete($id);
    }
}
