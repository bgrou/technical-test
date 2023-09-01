<?php

namespace App\Http\Controllers;

use App\Actions\GetAllFarmsWithIdAndName;
use App\Actions\GetAllManufacturersIdAndName;
use App\DTO\Turbine\CreateTurbineDTO;
use App\DTO\Turbine\UpdateTurbineDTO;
use App\Enums\ComponentTypeEnum;
use App\Http\Requests\Turbine\TurbineStoreRequest;
use App\Http\Requests\Turbine\TurbineUpdateRequest;
use App\Models\Inspection;
use App\Models\Turbine;
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

class TurbineController extends Controller
{
    public function __construct(
        protected TurbineService $service,
        protected GetAllManufacturersIdAndName $getAllManufacturersIdAndName,
        protected GetAllFarmsWithIdAndName $getAllFarmsWithIdAndName
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('Turbine/Index');
    }

    public function fetchIndex(Request $request, Turbine $turbine): AnonymousResourceCollection
    {
        return $this->service->fetchIndex($request, $turbine);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return Inertia::render('Turbine/Create', [
            'farms_list' => $this->getAllFarmsWithIdAndName->execute(),
            'manufacturers_list' => $this->getAllManufacturersIdAndName->execute(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TurbineStoreRequest $request
     * @return RedirectResponse
     */
    public function store(TurbineStoreRequest $request)
    {
        try {
            $createdTurbine = $this->service->create(
                CreateTurbineDTO::makeFromRequest($request)
            );
            return Redirect::route('turbine.show', ['id' => $createdTurbine->id])
                ->with('message', 'Turbine created successfully!');
        } catch (Exception $e) {
            Log::error('Error creating turbine: ' . $e->getMessage());
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
        $turbine = $this->service->findWithAssociations($id);
        if (!$turbine) {
            return $this->index()->with('error', 'Error showing turbine. That turbine does not exist.');
        }
        $componentTypes = ComponentTypeEnum::values();
        $componentsLowGrade = $this->service->getComponentsLowGrade($id);
        return Inertia::render('Turbine/Show', [
            'turbine' => $turbine,
            'component_types' => $componentTypes,
            'components_low_grade' => $componentsLowGrade
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit($id)
    {
        $turbine = $this->service->find($id);
        if (!$turbine) {
            return $this->index()->with('error', 'Error showing turbine. That turbine does not exist.');
        }
        return Inertia::render('Turbine/Edit', [
            'turbine' => $turbine,
            'farms_list' => $this->getAllFarmsWithIdAndName->execute(),
            'manufacturers_list' => $this->getAllManufacturersIdAndName->execute()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TurbineUpdateRequest $request
     * @return RedirectResponse
     */
    public function update(TurbineUpdateRequest $request)
    {
        try {
            $createdTurbine = $this->service->update(
                UpdateTurbineDTO::makeFromRequest($request)
            );
            return Redirect::route('turbine.show', ['id' => $createdTurbine->id])
                ->with('message', 'Turbine updated successfully!');
        } catch (Exception $e) {
            Log::error('Error updating turbine: ' . $e->getMessage());
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return RedirectResponse
     */
    public function destroy($id)
    {
        try {
            $this->service->delete($id);
            return Redirect::back()->with('message', 'Turbine deleted successfully!');
        } catch (Exception $e) {
            Log::error('Error deleting turbine: ' . $e->getMessage());
            return Redirect::back()->with('error', 'There was a problem deleting the turbine. Please try again.');
        }
    }
}
