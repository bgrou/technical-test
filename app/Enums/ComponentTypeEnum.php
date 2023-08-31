<?php

namespace App\Enums;

enum ComponentTypeEnum: string {
    case Blade = 'Blade';
    case Rotor = 'Rotor';
    case Hub = 'Hub';
    case Generator = 'Generator';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
