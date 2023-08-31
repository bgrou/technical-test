<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InspectionResource extends JsonResource
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
            'user_id'      => $this->user_id,
            'component_id' => $this->component_id,
            'type'         => $this->type,
            'grade'        => $this->grade,
            'date'         => $this->date,
            'user'         => new UserResource($this->whenLoaded('user'))
        ];
    }
}
