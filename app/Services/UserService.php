<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    public function __construct(
        protected UserRepository $repository)
    {}

    public function getAllIdAndName(): array
    {
        return $this->repository->getAllIdAndName();
    }
}
