<?php

namespace App\Actions;

use App\Repositories\TurbineRepository;
use App\Repositories\UserRepository;

class GetAllTurbinesId
{
    public function __construct(
        protected TurbineRepository $repository
    ) {
    }

    public function execute()
    {
    }
}
