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

        // status
        Schema::create('status', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->timestamps();
        });

        // payments Subpolygon
        Schema::create('payments_subpolygon', function (Blueprint $table) {
            $table->id();

            $table->foreignId("user_id");
            $table->decimal('amount', places: 2);
            $table->set('direction', ['in', 'out']);

            $table->set('status', ['pending', 'success', 'failure', 'abandoned']);
            $table->string("auth")->nullable();
            $table->smallInteger('response')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        // Payments Redsys
        Schema::create('payments_redsys', function (Blueprint $table) {
            $table->id();

            $table->foreignId("user_id");
            $table->decimal('amount', places: 2);
            $table->set('direction', ['in', 'out']);

            $table->set('status', ['pending', 'success', 'failure', 'abandoned']);
            $table->string("auth")->nullable();
            $table->smallInteger('response')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        // orders
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId("client_id");
            $table->foreignId("service_id");
            $table->foreignId("seller_id");
            $table->foreignId("status_id");
            $table->decimal('amount', places: 2);
            $table->nullableMorphs('payment');
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('users');
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('seller_id')->references('id')->on('users');
            $table->foreign('status_id')->references('id')->on('status');
        });

        Schema::table('conversations', function (Blueprint $table) {
            // make it easier to get this, instead of long complicated queries
            $table->foreignId('service_id')->nullable();
            $table->foreignId('order_id')->nullable();
            // this two should always refer to the latest order/service if multiple are mentioned

            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('order_id')->references('id')->on('orders');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('conversations', function (Blueprint $table) {
            $table->dropColumn('service_id');
            $table->dropColumn('order_id');
        });
        Schema::dropIfExists('orders');
        Schema::dropIfExists('payments_redsys');
        Schema::dropIfExists('payments_subpolygon');
        Schema::dropIfExists('status');
    }
};
