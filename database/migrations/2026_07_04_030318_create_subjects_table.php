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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedTinyInteger('assignment_weight')->default(0);
            $table->unsignedTinyInteger('mid_exam_weight')->default(0);
            $table->unsignedTinyInteger('final_exam_weight')->default(0);
            $table->unsignedInteger('shift_duration')->default(45); // menit
            $table->string('grade')->nullable(); // tingkat: X/XI/XII
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
