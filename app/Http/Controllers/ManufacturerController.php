<?php

namespace App\Http\Controllers;

use App\DTO\Manufacturer\CreateManufacturerDTO;
use App\DTO\Manufacturer\UpdateManufacturerDTO;
use App\Http\Requests\Manufacturer\ManufacturerStoreRequest;
use App\Http\Requests\Manufacturer\ManufacturerUpdateRequest;
use App\Models\Manufacturer;
use App\Services\ManufacturerService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ManufacturerController extends Controller
{
    public function __construct(
        protected ManufacturerService $service
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('Manufacturer/Index');
    }

    public function fetchIndex(Request $request, Manufacturer $manufacturer): AnonymousResourceCollection
    {
        return $this->service->fetchIndex($request, $manufacturer);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return Inertia::render('Manufacturer/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ManufacturerStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ManufacturerStoreRequest $request)
    {
        try {
            $createdManufacturer = $this->service->create(
                CreateManufacturerDTO::makeFromRequest($request)
            );
            return Redirect::route('manufacturer.show', ['id' => $createdManufacturer->id])
                ->with('message', 'Manufacturer created successfully!');
        } catch (Exception $e) {
            Log::error('Error creating manufacturer: ' . $e->getMessage());
            return Redirect::back()->with('error', 'There was an error creating the manufacturer. Please try again.');
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
        $manufacturer = $this->service->findWithAssociations($id);

        return Inertia::render('Manufacturer/Show', [
            'manufacturer' => $manufacturer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit($id)
    {
        $manufacturer = $this->service->find($id);
        return Inertia::render('Manufacturer/Edit', [
            'manufacturer' => $manufacturer
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ManufacturerUpdateRequest $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ManufacturerUpdateRequest $request)
    {
        try {
            $updatedManufacturer = $this->service->update(UpdateManufacturerDTO::makeFromRequest($request));
            return Redirect::route('manufacturer.show', ['id' => $updatedManufacturer->id])
                ->with('message', 'Manufacturer updated successfully!');
        } catch (Exception $e) {
            Log::error('Error updating manufacturer: ' . $e->getMessage());
            return Redirect::back()->with('error', 'There was an error updating the manufacturer. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return void
     */
    public function destroy($id)
    {
        //
    }
}
