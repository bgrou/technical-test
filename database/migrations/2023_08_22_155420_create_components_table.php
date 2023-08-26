<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('components', function (Blueprint $table)
        {
            $table->id();
            $table->string('type');
            $table->foreignId('turbine_id')->constrained();
            $table->foreignId('manufacturer_id')->constrained();
            $table->string('serial_number', 30)->nullable();
            $table->timestamps();

            $table->unique('serial_number');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('components');
    }
};
