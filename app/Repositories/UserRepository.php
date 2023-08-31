<?php

namespace App\Repositories;

use App\DTO\Inspection\CreateInspectionDTO;
use App\DTO\Inspection\UpdateInspectionDTO;
use App\Models\Inspection;
use App\Models\User;

class UserRepository
{
    public function __construct(
        protected User $user
    ){}

    public function getAllIdAndName(): array
    {
        return $this->user->select('id', 'name')->get()->toArray();
    }
}
