<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use App\Services\FarmService;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected FarmService $farmService,
        protected DashboardService $service
    ) {
    }

    /**
     * Display the specified resource.
     *
     * @return Response
     */
    public function show()
    {
        $farms = $this->farmService->getAll();
        $turbines_needing_attention = $this->service->getTurbinesNeedingAttention($farms);
        return Inertia::render('Dashboard', [
            'farms' => $farms,
            'turbines_needing_attention' => $turbines_needing_attention
        ]);
    }
}
