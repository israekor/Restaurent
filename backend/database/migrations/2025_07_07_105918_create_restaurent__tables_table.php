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
        Schema::create('restaurent_tables', function (Blueprint $table) {
            $table->id();
            $table->integer('numero');
            $table->integer('capacite');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // Responsable
            $table->foreignId('salle_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurent_tables');
    }
};
