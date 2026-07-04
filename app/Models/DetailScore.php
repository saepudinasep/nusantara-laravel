<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetailScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'detail_schedule_id',
        'student_id',
        'assignment',
        'mid_exam',
        'final_exam',
    ];

    public function detailSchedule(): BelongsTo
    {
        return $this->belongsTo(DetailSchedule::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
