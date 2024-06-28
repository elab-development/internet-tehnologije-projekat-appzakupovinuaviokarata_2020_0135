<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreatePassengersTable extends Migration
{
    public function up()
    {
        Schema::create('passengers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('passport_number');
            $table->string('nationality');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('passengers');
    }
}

