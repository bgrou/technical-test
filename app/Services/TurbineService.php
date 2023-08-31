<?php

namespace App\Services;

use App\DTO\Turbine\CreateTurbineDTO;
use App\DTO\Turbine\UpdateTurbineDTO;
use App\Helpers\DataTable\DataTableHelper;
use App\Http\Resources\TurbineResource;
use App\Models\Turbine;
use App\Repositories\TurbineRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;

class TurbineService
{
    public function __construct(
        protected TurbineRepository $repository
    ) {
    }

    /**
     *
     * @throws Exception
     */
    public function create(CreateTurbineDTO $dto)
    {
        try {
            return $this->repository->create($dto);
        } catch (Exception $e) {
            Log::error('Error creating turbine: ' . $e->getMessage());
            throw new Exception('There was an error creating the turbine. Please try again.');
        }
    }


    /**
     * Fetch Turbines Data for the Index Datatable
     * @param Request $request
     * @param Turbine $turbine
     * @return AnonymousResourceCollection
     */
    public function fetchIndex(Request $request, Turbine $turbine): AnonymousResourceCollection
    {
        $allowedFields = ['id', 'farm_id', 'manufacturer_id', 'capacity', 'is_active', 'started_at'];
        $turbines = DataTableHelper::fetchData(
            $request,
            $turbine,
            'started_at',
            'desc',
            ['components'],
            $allowedFields
        );

        return TurbineResource::collection($turbines);
    }


    /**
     * @param $id
     * @return object|null
     */
    public function find($id): ?object
    {
        return $this->repository->find($id);
    }


    /**
     * Find a Turbine by id with all Relationships
     * @param $id
     * @return object|null
     */
    public function findWithAssociations($id): ?object
    {
        return $this->repository->findWithAssociations($id);
    }

    /**
     * @throws Exception
     */
    public function update(UpdateTurbineDTO $dto): ?object
    {
        try {
            return $this->repository->update($dto);
        } catch (Exception $e) {
            Log::error('Error updating turbine: ' . $e->getMessage());
            throw new Exception('There was an error updating the turbine. Please try again.');
        }
    }

    public function getComponentsLowGrade($id): ?array
    {
        $lowGradeLimit = 3;
        $turbine = $this->repository->getComponentsWithLatestInspection($id);

        if (!$turbine) {
            return null;
        }

        $componentsLowGrade = collect($turbine->components)
            ->filter(function ($component) use ($lowGradeLimit) {
                return $component['latest_inspection'] !== null && $component['latest_inspection']['grade'] > $lowGradeLimit;
            })
            ->map(function ($component) {
                return [
                    "component_id" => $component['id'],
                    "type" => $component['type'],
                    "grade" => $component['latest_inspection']['grade']
                ];
            })
            ->values()
            ->all();

        return [
            "turbine_id" => $turbine->id,
            "components_low_grade" => $componentsLowGrade
        ];
    }
}
