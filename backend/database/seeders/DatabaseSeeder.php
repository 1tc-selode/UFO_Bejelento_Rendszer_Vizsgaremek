<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Felhasználók, kategóriák, reportok, szavazatok, minden demo adat
        $this->call([
            DemoSeeder::class,
        ]);
    }
}
