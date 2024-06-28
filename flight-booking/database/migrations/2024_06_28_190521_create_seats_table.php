<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeatsTable extends Migration
{
    public function up()
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flight_id')->constrained()->onDelete('cascade');
            $table->string('seat_number');
            $table->string('class');
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('seats');
    }
}

