<?php

namespace Database\Factories;

use App\Models\Farm;
use App\Models\Manufacturer;
use App\Models\Turbine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Turbine>
 */
class TurbineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'farm_id' => Farm::all()->random()->id,
            'manufacturer_id' => Manufacturer::all()->random()->id,
            'capacity' => $this->faker->randomFloat(2, 10, 999),
            'is_active' => $this->faker->boolean(),
            'started_at' => $this->faker->dateTime()
        ];
    }
}
