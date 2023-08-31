<?php

namespace App\Services;

use App\DTO\Farm\CreateFarmDTO;
use App\DTO\Farm\UpdateFarmDTO;
use App\Helpers\DataTable\DataTableHelper;
use App\Http\Resources\FarmResource;
use App\Models\Farm;
use App\Repositories\FarmRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FarmService
{
    public function __construct(
        protected FarmRepository $repository,
        protected TurbineService $turbineService
    ) {
    }

    public function create(CreateFarmDTO $dto)
    {
        return $this->repository->create($dto);
    }

    public function fetchIndex(Request $request, Farm $farm)
    {
        $allowedFields = ['id', 'name', 'latitude', 'longitude'];
        $farms = DataTableHelper::fetchData($request, $farm, 'id', 'desc', $allowedFields);

        return FarmResource::collection($farms);
    }

    public function find($id): ?object
    {
        return $this->repository->find($id);
    }

    public function findWithAssociations($id): ?object
    {
        return $this->repository->findWithAssociations($id);
    }

    /**
     * @throws Exception
     */
    public function update(UpdateFarmDTO $dto): ?object
    {
        try {
            return $this->repository->update($dto);
        } catch (Exception $e) {
            Log::error('Error updating farm: ' . $e->getMessage());
            throw new Exception('There was an error updating the farm. Please try again.');
        }
    }

    public function getTurbinesLowGradeComponents(object $farm): ?array
    {
        $turbines = $this->repository->getTurbines($farm->id);

        if (!$turbines) {
            return null;
        }

        return collect($turbines)
            ->map(function ($turbine) {
                return $this->turbineService->getComponentsLowGrade($turbine['id']);
            })
            ->filter(function ($turbine) { //Only return turbines that have low grade components
                return !empty($turbine['components_low_grade']);
            })
            ->values()
            ->all();
    }

    public function getAllWithTurbines(): array
    {
        return $this->repository->getAll();
    }
}
