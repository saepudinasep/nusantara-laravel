<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('detail_schedule_id')->constrained('detail_schedules')->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('students')->cascadeOnDelete();
            $table->unsignedTinyInteger('assignment')->nullable();
            $table->unsignedTinyInteger('mid_exam')->nullable();
            $table->unsignedTinyInteger('final_exam')->nullable();
            $table->timestamps();

            $table->unique(['detail_schedule_id', 'student_id'], 'detail_scores_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_scores');
    }
};
