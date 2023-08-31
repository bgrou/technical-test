<?php

namespace App\Enums;

enum ComponentGradeEnum: int {
    case Perfect = 1;
    case Good = 2;
    case Fair = 3;
    case Poor = 4;
    case Broken = 5;

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

