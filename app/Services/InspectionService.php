<?php

namespace App\Services;

use App\DTO\Inspection\CreateInspectionDTO;
use App\DTO\Inspection\UpdateInspectionDTO;
use App\Helpers\DataTable\DataTableHelper;
use App\Http\Resources\InspectionResource;
use App\Models\Inspection;
use App\Repositories\InspectionRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;

class InspectionService
{
    public function __construct(
        protected InspectionRepository $repository
    ) {
    }

    public function create(CreateInspectionDTO $dto)
    {
        return $this->repository->create($dto);
    }

    public function getAll(string $filterField = null, string $filterValue = null): array
    {
        return $this->repository->getAll($filterField, $filterValue);
    }

    public function fetchIndex(Request $request, Inspection $inspection): AnonymousResourceCollection
    {
        $allowedFields = ['id', 'component_id', 'date', 'user.name', 'grade'];
        $inspections = DataTableHelper::fetchData($request, $inspection, 'date', 'desc', ['user'], $allowedFields);

        return InspectionResource::collection($inspections);
    }

    public function update(UpdateInspectionDTO $dto): ?object
    {
        return $this->repository->update($dto);
    }

    public function find($id): ?object
    {
        return $this->repository->find($id);
    }

    public function delete($id): void
    {
        $this->repository->delete($id);
    }

    public function findWithAssociations($id): ?object
    {
        return $this->repository->findWithAssociations($id);
    }
}
