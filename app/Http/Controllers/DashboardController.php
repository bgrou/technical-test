<?php

namespace App\Http\Controllers;

use App\Services\FarmService;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected FarmService $farmService
    ) {
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return Response
     */
    public function show()
    {
        $farms = $this->farmService->getAllWithTurbines();

        return Inertia::render('Dashboard', [
            'farms' => $farms
        ]);
    }
}
