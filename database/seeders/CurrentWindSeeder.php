<?php

namespace Database\Seeders;

use App\Models\CurrentWind;
use App\Models\Farm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrentWindSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $farmIds = Farm::pluck('id')->all();

        foreach ($farmIds as $farmId) {
            CurrentWind::factory()->create([
                'farm_id' => $farmId,
            ]);
        }
    }
}
