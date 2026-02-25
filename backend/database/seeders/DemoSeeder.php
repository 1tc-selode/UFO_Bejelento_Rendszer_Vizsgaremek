<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Report;
use App\Models\Vote;
use App\Models\User;
use Illuminate\Support\Carbon;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // Kategóriák
        $categories = [
            ['name' => 'UFO észlelés', 'description' => 'Ismeretlen repülő tárgy észlelése'],
            ['name' => 'Paranormális jelenség', 'description' => 'Szellemek, poltergeist, stb.'],
            ['name' => 'Fényjelenség', 'description' => 'Furcsa fények az égen vagy földön'],
        ];
        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat['name']], $cat);
        }

        // Felhasználók (ha nincsenek)
        $admin = User::firstOrCreate([
            'email' => 'admin@example.com'
        ], [
            'name' => 'Admin User',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);
        $user = User::firstOrCreate([
            'email' => 'elek@gmail.com'
        ], [
            'name' => 'Test User',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);

        // Reportok
        $cat1 = Category::where('name', 'UFO észlelés')->first();
        $cat2 = Category::where('name', 'Paranormális jelenség')->first();
        $cat3 = Category::where('name', 'Fényjelenség')->first();

        $reports = [
            [
                'user_id' => $user->id,
                'category_id' => $cat1->id,
                'title' => 'Furcsa fények az égen',
                'description' => 'Tegnap este 3 fényes pont mozgott gyorsan az égen.',
                'latitude' => 47.4979,
                'longitude' => 19.0402,
                'date' => Carbon::now()->subDays(2)->toDateString(),
                'witnesses' => 2,
            ],
            [
                'user_id' => $user->id,
                'category_id' => $cat2->id,
                'title' => 'Szellem a padláson',
                'description' => 'Éjszaka furcsa hangokat hallottam a padláson.',
                'latitude' => 47.5,
                'longitude' => 19.05,
                'date' => Carbon::now()->subDays(5)->toDateString(),
                'witnesses' => 1,
            ],
            [
                'user_id' => $admin->id,
                'category_id' => $cat3->id,
                'title' => 'Villogó fény a mezőn',
                'description' => 'Egy villogó fényt láttam a mezőn, ami hirtelen eltűnt.',
                'latitude' => 47.51,
                'longitude' => 19.03,
                'date' => Carbon::now()->subDays(1)->toDateString(),
                'witnesses' => 3,
            ],
        ];
        foreach ($reports as $rep) {
            Report::firstOrCreate([
                'title' => $rep['title'],
                'user_id' => $rep['user_id']
            ], $rep);
        }

        // Szavazatok
        $report1 = Report::where('title', 'Furcsa fények az égen')->first();
        $report2 = Report::where('title', 'Szellem a padláson')->first();
        $report3 = Report::where('title', 'Villogó fény a mezőn')->first();

        // Szavazatok: teszteljük a 1, 0, -1 állapotokat

        // 1. report1: admin up, user down => 0
        $vote1 = Vote::firstOrCreate([
            'user_id' => $admin->id,
            'report_id' => $report1->id,
        ]);
        $vote1->vote_type = 'up';
        $vote1->save();

        $vote2 = Vote::firstOrCreate([
            'user_id' => $user->id,
            'report_id' => $report1->id,
        ]);
        $vote2->vote_type = 'down';
        $vote2->save();

        // 2. report2: csak admin up => 1
        $vote3 = Vote::firstOrCreate([
            'user_id' => $admin->id,
            'report_id' => $report2->id,
        ]);
        $vote3->vote_type = 'up';
        $vote3->save();

        // 3. report3: csak user down => -1
        $vote4 = Vote::firstOrCreate([
            'user_id' => $user->id,
            'report_id' => $report3->id,
        ]);
        $vote4->vote_type = 'down';
        $vote4->save();
    }
}
