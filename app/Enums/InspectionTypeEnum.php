<?php

namespace App\Enums;

enum InspectionTypeEnum: string {
    case Routine = 'Routine';
    case Maintenance = 'Maintenance';
    case DamageAssessment = 'Damage Assessment';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
