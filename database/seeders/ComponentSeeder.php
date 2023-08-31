<?php

namespace Database\Seeders;

use App\Enums\ComponentTypeEnum;
use App\Models\Component;
use App\Models\Turbine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (Turbine::all() as $turbine) {
            foreach (ComponentTypeEnum::values() as $type) {
                Component::factory()->create(['turbine_id' => $turbine->id, 'type' => $type]);
            }
        }
    }
}
