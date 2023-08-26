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
        Schema::create('turbines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained();
            $table->foreignId('manufacturer_id')->constrained();
            $table->decimal('capacity',5, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->dateTime('started_at');
            $table->timestamps();

            $table->index('started_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('turbines');
    }
};
