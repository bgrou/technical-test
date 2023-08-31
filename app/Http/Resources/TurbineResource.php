<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TurbineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'           => $this->id,
            'farm_id'      => $this->farm_id,
            'manufacturer_id' => $this->manufacturer_id,
            'capacity'         => $this->capacity,
            'is_active'        => $this->is_active,
            'started_at'         => $this->started_at,
        ];
    }
}
