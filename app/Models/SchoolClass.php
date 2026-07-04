<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Merepresentasikan tabel "classes" (rombongan belajar).
 * Nama model SchoolClass dipakai karena "Class" adalah reserved word di PHP.
 */
class SchoolClass extends Model
{
    use HasFactory;

    // protected $table = 'classes';

    protected $fillable = [
        'name',
        'grade',
    ];

    public function detailClasses(): HasMany
    {
        return $this->hasMany(DetailClass::class, 'class_id');
    }

    public function headerSchedules(): HasMany
    {
        return $this->hasMany(HeaderSchedule::class, 'class_id');
    }
}
