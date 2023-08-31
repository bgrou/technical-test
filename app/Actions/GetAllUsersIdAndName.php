<?php

namespace App\Actions;

use App\Repositories\UserRepository;

class GetAllUsersIdAndName
{
    public function __construct(
        protected UserRepository $repository
    ) {
    }

    public function execute()
    {
        return $this->repository->getAllIdAndName();
    }
}
