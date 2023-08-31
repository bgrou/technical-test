<?php

namespace App\Http\Controllers;

use App\DTO\Farm\CreateFarmDTO;
use App\DTO\Farm\UpdateFarmDTO;
use App\Helpers\DataTable\DataTableHelper;
use App\Http\Requests\Farm\FarmStoreRequest;
use App\Http\Requests\Farm\FarmUpdateRequest;
use App\Http\Resources\FarmResource;
use App\Models\Farm;
use App\Services\FarmService;
use App\Services\TurbineService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FarmController extends Controller
{
    public function __construct(
        protected FarmService $service,
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Farm/Index');
    }

    public function fetchIndex(Request $request, Farm $farm): AnonymousResourceCollection
    {
        $allowedFields = ['id', 'name', 'latitude', 'longitude'];
        $farms = DataTableHelper::fetchData($request, $farm, 'id', 'desc', [], $allowedFields);

        return FarmResource::collection($farms);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Farm/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param FarmStoreRequest $request
     * @return RedirectResponse
     */
    public function store(FarmStoreRequest $request)
    {
        try {
            $createdFarm = $this->service->create(CreateFarmDTO::makeFromRequest($request));
            return Redirect::route('farm.show', ['id' => $createdFarm->id])
                ->with('message', 'Farm created successfully!');
        } catch (Exception $e) {
            Log::error('Error creating farm: ' . $e->getMessage());
            return Redirect::back()->with('error', 'There was an error creating the farm. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $farm = $this->service->findWithAssociations($id);
        $turbinesNeedingAttention = $this->service->getTurbinesLowGradeComponents($id);
        return Inertia::render('Farm/Show', [
            'farm' => $farm,
            'turbines_needing_attention' => $turbinesNeedingAttention
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $farm = $this->service->find($id);

        return Inertia::render('Farm/Edit', [
            'farm' => $farm
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param FarmUpdateRequest $request
     * @return RedirectResponse
     */
    public function update(FarmUpdateRequest $request)
    {
        try {
            $updatedFarm = $this->service->update(UpdateFarmDTO::makeFromRequest($request));
            return Redirect::route('farm.show', ['id' => $updatedFarm->id])
                ->with('message', 'Farm updated successfully!');
        } catch (Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Farm $farm
     * @return Response
     */
    public function destroy(Farm $farm)
    {
        //
    }
}
