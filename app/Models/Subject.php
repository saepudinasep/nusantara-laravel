<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'assignment_weight',
        'mid_exam_weight',
        'final_exam_weight',
        'shift_duration',
        'grade',
    ];

    public function expertise(): HasMany
    {
        return $this->hasMany(Expertise::class);
    }

    public function detailSchedules(): HasMany
    {
        return $this->hasMany(DetailSchedule::class);
    }
}
