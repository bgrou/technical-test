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
    ) {}

    /**
     * @throws Exception
     */
    public function create(CreateInspectionDTO $dto)
    {
        try {
            return $this->repository->create($dto);


        } catch (Exception $e) {
            Log::error('Error updating inspection: ' . $e->getMessage());
            throw new Exception('There was an error creating the inspection. Please try again.');
        }
    }

    public function fetchIndex(Request $request, Inspection $inspection): AnonymousResourceCollection
    {
        $allowedFields = ['id', 'component_id', 'date', 'user.name', 'grade'];
        $inspections = DataTableHelper::fetchData($request, $inspection, 'date', 'desc', ['user'], $allowedFields);

        return InspectionResource::collection($inspections);
    }

    /**
     * @throws Exception
     */
    public function update(UpdateInspectionDTO $dto): ?object
    {
            return $this->repository->update($dto);
    }

    public function find($id): ?object
    {
        return $this->repository->find($id);
    }

    public function findWithAssociations($id): ?object
    {
        return $this->repository->findWithAssociations($id);
    }
}
