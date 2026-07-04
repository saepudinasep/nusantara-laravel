<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'gender',
        'date_of_birth',
        'phone_number',
        'photo',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function detailClasses(): HasMany
    {
        return $this->hasMany(DetailClass::class);
    }

    public function detailScores(): HasMany
    {
        return $this->hasMany(DetailScore::class);
    }
}
