<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HeaderSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id',
        'finalize',
    ];

    protected $casts = [
        'finalize' => 'boolean',
    ];

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function detailSchedules(): HasMany
    {
        return $this->hasMany(DetailSchedule::class, 'schedule_id');
    }
}
