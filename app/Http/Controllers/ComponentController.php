<?php

namespace App\Http\Controllers;

use App\Actions\GetAllManufacturersIdAndName;
use App\DTO\Component\CreateComponentDTO;
use App\DTO\Component\UpdateComponentDTO;
use App\Enums\ComponentTypeEnum;
use App\Http\Requests\Component\ComponentStoreRequest;
use App\Http\Requests\Component\ComponentUpdateRequest;
use App\Models\Component;
use App\Services\ComponentService;
use Exception;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ComponentController extends Controller
{
    use SoftDeletes;

    public function __construct(
        protected ComponentService $service,
        protected GetAllManufacturersIdAndName $getAllManufacturersIdAndName
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Component/Index');
    }


    public function fetchIndex(Request $request, Component $component): AnonymousResourceCollection
    {
        return $this->service->fetchIndex($request, $component);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create($typeRequired, $turbineId)
    {
        return Inertia::render('Component/Create', [
            'manufacturers_list' => $this->getAllManufacturersIdAndName->execute(),
            'type_required' => $typeRequired,
            'turbine_id' => $turbineId
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(ComponentStoreRequest $request)
    {
        try {
            $createdComponent = $this->service->create(
                CreateComponentDTO::makeFromRequest($request)
            );
            return Redirect::route('turbine.show', ['id' => $createdComponent->turbine_id])
                ->with('message', 'Component created successfully!');
        } catch (Exception $e) {
            Log::error('Error creating component: ' . $e->getMessage());
            return Redirect::back()->with('error', 'Error creating component. Please try again.');
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
        $component = $this->service->findWithAssociations($id);

        return Inertia::render('Component/Show', [
            'component' => $component
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
        $component = $this->service->find($id);
        return Inertia::render('Component/Edit', [
            'component' => $component,
            'type_values' => ComponentTypeEnum::values(),
            'manufacturers_list' => $this->getAllManufacturersIdAndName->execute()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ComponentUpdateRequest $request
     * @return RedirectResponse
     * @throws Exception
     */
    public function update(ComponentUpdateRequest $request)
    {
        try {
            $updatedComponent = $this->service->update(UpdateComponentDTO::makeFromRequest($request));

            return Redirect::route('turbine.show', ['id' => $updatedComponent->turbine_id])
                ->with('message', 'Component updated successfully!');
        } catch (Exception $e) {
            return Redirect::back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy($id, Request $request)
    {
        try {
            $this->service->delete($id);
            $referrer = $request->header('referer');
            if ($referrer && str_contains($referrer, 'turbine')) {
                return Redirect::back()->with('message', 'Component deleted successfully!');
            } else {
                return Redirect::route('component.index')->with('message', 'Component deleted successfully!');
            }
        } catch (Exception $e) {
            return Redirect::back()->with('error', 'Error deleting component: ' . $e->getMessage());
        }
    }
}
