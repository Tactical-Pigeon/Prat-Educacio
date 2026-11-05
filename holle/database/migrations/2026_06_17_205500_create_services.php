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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('title');
            $table->text('description')->nullable();
            $table->fullText(['title', 'description']);

            $table->boolean('published');
            $table->boolean('featured');
            $table->foreignId('seller_id');
            $table->decimal('price', places: 2);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('seller_id')->references('id')->on('users');
        });

        Schema::create("services_media", function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id');
            $table->tinyInteger('type'); // 1 image, 2 video; up to 255 for future use
            $table->tinyInteger('position');
            $table->boolean("cover");
            $table->string('url');
            $table->string('alt')->nullable();
            $table->timestamps();

            $table->foreign('service_id')->references('id')->on('services');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services_media');
        Schema::dropIfExists('services');
    }
};
