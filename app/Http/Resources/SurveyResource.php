<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'image'=> $this->image !== 'null' ? URL::to($this->image) : null,
            'image_url'=> $this->image !== 'null' ? URL::to($this->image) : null,
            'title'=>$this->title,
            'slug'=>$this->slug,
            'status'=>$this->status !== 'draft',
            'description'=>$this->description,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at,
            'expired_date'=>$this->expired_date,
            'questions'=> SurveyQuestionResource::collection($this->questions)
        ];
    }
}
