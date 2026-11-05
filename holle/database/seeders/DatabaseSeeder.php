<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // system user
        DB::table('users')->insert([
            'name' => "Holle System",
            'username' => "holleSystem",
            'email' => "holle@tacticalpigeon.com",
            'is_seller' => 0,
            'is_admin' => 1,
        ]);

        // status 
        DB::table('status')->insert([
            'name' => "Awaiting payment",
            'description' => "The order has been created but is waiting for the client to finish payment",
        ]);
        DB::table('status')->insert([
            'name' => "Order confirmed",
            'description' => "The order has been created and payed for",
        ]);
        DB::table('status')->insert([
            'name' => "In Progress",
            'description' => "The order is actively being worked on",
        ]);
        DB::table('status')->insert([
            'name' => "Delivered",
            'description' => "The final product has been delivered and is pending client approval",
        ]);
        DB::table('status')->insert([
            'name' => "Complete",
            'description' => "The final product has been delivered and approved, the order is now finished",
        ]);
        DB::table('status')->insert([
            'name' => "Dispute",
            'description' => "Dispute afer delivery",
        ]);
    }
}
