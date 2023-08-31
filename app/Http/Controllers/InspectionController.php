<?php

namespace App\Http\Controllers;

use App\Actions\GetAllUsersIdAndName;
use App\DTO\Inspection\CreateInspectionDTO;
use App\DTO\Inspection\UpdateInspectionDTO;
use App\Enums\ComponentGradeEnum;
use App\Enums\InspectionTypeEnum;
use App\Http\Requests\Inspection\InspectionStoreRequest;
use App\Http\Requests\Inspection\InspectionUpdateRequest;
use App\Models\Inspection;
use App\Services\ComponentService;
use App\Services\InspectionService;
use App\Services\TurbineService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class InspectionController extends Controller
{
    public function __construct(
        protected InspectionService $service,
        protected GetAllUsersIdAndName $getAllUsersIdAndName
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('Inspection/Index');
    }

    public function fetchIndex(Request $request, Inspection $inspection): AnonymousResourceCollection
    {
        return $this->service->fetchIndex($request, $inspection);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create($componentId)
    {
        return Inertia::render('Inspection/Create', [
            'component_id' => $componentId,
            'type_values' => InspectionTypeEnum::values(),
            'grade_values' => ComponentGradeEnum::values(),
            'users_list' => $this->getAllUsersIdAndName->execute()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param InspectionStoreRequest $request
     * @return RedirectResponse
     * @throws Exception
     */
    public function store(InspectionStoreRequest $request)
    {
        try {
            $createdInspection = $this->service->create(
                CreateInspectionDTO::makeFromRequest($request)
            );
            return Redirect::route('inspection.show', ['id' => $createdInspection->id])
                ->with('message', 'Inspection created successfully!');
        } catch (Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return Response
     */
    public function show($id)
    {
        $inspection = $this->service->findWithAssociations($id);

        return Inertia::render('Inspection/Show', [
            'inspection' => $inspection
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit($id)
    {
        $inspection = $this->service->find($id);

        return Inertia::render('Inspection/Edit', [
            'inspection' => $inspection,
            'type_values' => InspectionTypeEnum::values(),
            'grade_values' => ComponentGradeEnum::values(),
            'users_list' => $this->getAllUsersIdAndName->execute()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param InspectionUpdateRequest $request
     * @return RedirectResponse
     */
    public function update(InspectionUpdateRequest $request)
    {
        try {
            $updatedInspection = $this->service->update(UpdateInspectionDTO::makeFromRequest($request));
            return Redirect::route('inspection.show', ['id' => $updatedInspection->id])
                ->with('message', 'Inspection updated successfully!');
        } catch (Exception $e) {
            Log::error('Error updating inspection: ' . $e->getMessage());
            return Redirect::back()->with('error', 'There was an error updating the inspection. Please try again.');
        }
    }
}
