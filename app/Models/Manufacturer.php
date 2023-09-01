<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Manufacturer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'address',
        'email'
    ];

    public function components(): HasMany
    {
        return $this->hasMany(Component::class);
    }

    public function turbines(): HasMany
    {
        return $this->hasMany(Turbine::class);
    }
}
