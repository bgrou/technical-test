<?php

namespace Database\Seeders;

use App\Models\Inspection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InspectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Inspection::factory()
            ->count(10000)
            ->create();
    }
}
