<?php

namespace App\Models;

use App\Enums\ComponentTypeEnum;
use Database\Seeders\ManufacturerSeeder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Component extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'turbine_id',
        'manufacturer_id',
        'type',
        'serial_number'
    ];

    protected $casts = [
        'type' => ComponentTypeEnum::class
    ];

    public function turbine(): BelongsTo
    {
        return $this->belongsTo(Turbine::class, 'turbine_id');
    }

    public function inspections(): HasMany
    {
        return $this->hasMany(Inspection::class);
    }

    public function latestInspection(): HasOne
    {
        return $this->hasOne(Inspection::class)->latestOfMany('date');
    }

    public function manufacturer(): BelongsTo
    {
        return $this->belongsTo(Manufacturer::class);
    }
}
