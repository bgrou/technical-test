<?php

namespace Database\Factories;

use App\Enums\ComponentGradeEnum;
use App\Enums\InspectionTypeEnum;
use App\Models\Component;
use App\Models\Inspection;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Inspection>
 */
class InspectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'component_id' => Component::all()->random()->id,
            'user_id' => User::all()->random()->id,
            'grade' => $this->faker->randomElement(ComponentGradeEnum::values()),
            'type' => $this->faker->randomElement(InspectionTypeEnum::values()),
            'date' => $this->faker->dateTime(),
            'notes' => $this->faker->realText(250),
            'req_maintenance' => $this->faker->realText(250),
        ];
    }
}
