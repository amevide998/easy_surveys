<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['survey_id', 'start_date', 'end_date'];

    const CREATED_AT = null;
    const UPDATED_AT = null;

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}
