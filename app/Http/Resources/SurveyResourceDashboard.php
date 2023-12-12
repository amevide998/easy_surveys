<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use Nette\Utils\DateTime;

class SurveyResourceDashboard extends JsonResource
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
            'created_at'=>(new DateTime($this->created_at))->format('Y-m-d H:i:s'),
            'expired_date'=>$this->expired_date,
            'questions'=>$this->questions()->count(),
            'answers'=>$this->answers()->count()
        ];
    }
}