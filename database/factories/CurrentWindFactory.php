<?php

namespace Database\Factories;

use App\Models\Farm;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;

/**
 * @extends Model>
 */
class CurrentWindFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $farmIds = Farm::pluck('id')->all();

        return [
            'farm_id' => array_shift($farmIds),
            'wind_speed' => $this->faker->randomFloat(2, 0, 60)
        ];
    }
}
