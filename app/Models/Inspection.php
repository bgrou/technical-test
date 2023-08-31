<?php

namespace App\Models;

use App\Enums\InspectionTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ComponentGradeEnum;

class Inspection extends Model
{
    use HasFactory;

    protected $fillable = [
        'component_id',
        'user_id',
        'grade',
        'type',
        'notes',
        'date'
    ];

    protected $dates = [
        'date'
    ];

    protected $casts = [
        'grade' => ComponentGradeEnum::class,
        'type'  => InspectionTypeEnum::class
    ];

    public function component(): BelongsTo
    {
        return $this->belongsTo(Component::class, 'component_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
