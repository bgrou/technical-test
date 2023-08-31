<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Turbine extends Model
{
    use HasFactory;

    protected $fillable = [
        'farm_id',
        'manufacturer_id',
        'capacity',
        'status',
        'started_at',
        'is_active'
    ];

    protected $dates = [
        'started_at'
    ];

    public function components(): HasMany
    {
        return $this->hasMany(Component::class);
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function manufacturer(): BelongsTo
    {
        return $this->belongsTo(Manufacturer::class);
    }
}
