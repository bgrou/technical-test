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

class DashboardService
{
    public function __construct(
        protected FarmService $farmService
    ) {
    }

    public function getTurbinesNeedingAttention(array $farms)
    {
        $turbinesNeedingAttention = array_filter(array_map(function ($farm) {
            return $this->farmService->getTurbinesLowGradeComponents($farm['id']);
        }, $farms));
        return (object) $turbinesNeedingAttention;
    }
}
