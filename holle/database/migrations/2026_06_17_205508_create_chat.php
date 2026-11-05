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
        // conversation / thread (one per user)
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id'); // TODO, check, are we calling them clients or something else?
            $table->foreignId('seller_id');

            // nothing else?

            $table->foreign('client_id')->references('id')->on('users');
            $table->foreign('seller_id')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('conversation_id');

            $table->text('message')->nullable();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('conversation_id')->references('id')->on('conversations');
            $table->timestamps();
        });

        Schema::create("messages_media", function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type'); // 1 image, 2 video, 3 audio, 4 blob(no preview); up to 255 for future use
            $table->string('url');
            $table->timestamps();
        });

        // tie it all together
        Schema::create('messageables', function (Blueprint $table) {
            $table->foreignId('message_id');
            $table->morphs('messageable');

            $table->foreign('message_id')->references('id')->on('messages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messageable');
        Schema::dropIfExists('messages_media');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('conversations');
    }
};
