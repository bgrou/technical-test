<?php

namespace App\Actions;

use App\Repositories\FarmRepository;

class GetAllFarmsWithIdAndName
{
    public function __construct(
        protected FarmRepository $repository
    ) {
    }

    public function execute()
    {
        return $this->repository->getAllWithIdAndName();
    }
}
