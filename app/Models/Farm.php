<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use MatanYadaev\EloquentSpatial\Objects\Point;

class Farm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'latitude',
        'longitude'
    ];

    public function turbines(): HasMany
    {
        return $this->hasMany(Turbine::class);
    }

    public function currentWind(): HasOne
    {
        return $this->hasOne(CurrentWind::class);
    }
}
