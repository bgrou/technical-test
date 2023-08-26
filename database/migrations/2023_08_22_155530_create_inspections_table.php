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
        Schema::create('inspections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('component_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->string('type')->default('routine');
            $table->integer('grade')->default(1);
            $table->dateTime('date');
            $table->string('notes', 250)->nullable();
            $table->timestamps();
            $table->index('grade');
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inspections');
    }
};
