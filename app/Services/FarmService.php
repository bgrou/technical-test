<?php

namespace App\Services;

use App\DTO\Farm\CreateFarmDTO;
use App\DTO\Farm\UpdateFarmDTO;
use App\Helpers\DataTable\DataTableHelper;
use App\Http\Resources\FarmResource;
use App\Models\Farm;
use App\Repositories\FarmRepository;
use Collection;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
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

    public function update(UpdateFarmDTO $dto): ?object
    {
        return $this->repository->update($dto);
    }

    public function fetchIndex(Request $request, Farm $farm): AnonymousResourceCollection
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

    public function getTurbinesLowGradeComponents($farmId): ?array
    {
        $turbines = $this->repository->getTurbines($farmId);

        if (!$turbines) {
            return null;
        }

        $filteredTurbines = collect($turbines)
            ->map(function ($turbine) {
                return $this->turbineService->getComponentsLowGrade($turbine['id']);
            })
            ->filter()
            ->filter(function ($turbine) {
                return !empty($turbine['components_low_grade']);
            })
            ->values()
            ->all();

        return [
            'farm_id' => $farmId,
            'turbines' => $filteredTurbines
        ];
    }

    public function getAll(): array
    {
        return $this->repository->getAll();
    }
}
