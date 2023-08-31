<?php

namespace Database\Factories;

use App\Enums\ComponentTypeEnum;
use App\Models\Component;
use App\Models\Manufacturer;
use App\Models\Turbine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Component>
 */
class ComponentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array|null
     */
    public function definition(): array|null
    {
        $turbineId = $this->faker->optional()->passthrough($this->attributes['turbine_id'] ?? null)
            ?? Turbine::query()->inRandomOrder()->first()?->id;


        $type = $this->faker->optional()->passthrough($this->attributes['type'] ?? null)
            ?? $this->faker->randomElement(ComponentTypeEnum::values());

        return [
            'type' => $type,
            'turbine_id' => $turbineId,
            'manufacturer_id' => Manufacturer::all()->random()->id,
            'serial_number' => $this->faker->regexify('[A-Za-z0-9]{20}')
        ];
    }
}
