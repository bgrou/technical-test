<?php

namespace Database\Seeders;

use App\Models\Turbine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TurbineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Turbine::factory()
            ->count(50)
            ->create();
    }
}
