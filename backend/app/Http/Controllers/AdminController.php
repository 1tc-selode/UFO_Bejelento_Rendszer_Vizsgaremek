<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Összes bejelentés kezelése
    public function getReports()
    {
        $reports = \App\Models\Report::with(['user', 'category', 'images', 'votes'])->get();
        return response()->json($reports);
    }

    // Bármely bejelentés törlése
    public function deleteReport($id)
    {
        $report = \App\Models\Report::findOrFail($id);
        $report->delete();
        return response()->json(['message' => 'Report deleted successfully']);
    }

    // Bejelentés jóváhagyása
    public function approveReport($id)
    {
        $report = \App\Models\Report::findOrFail($id);
        $report->status = 'approved';
        $report->save();
        return response()->json(['message' => 'Report approved successfully']);
    }

    // Összes felhasználó listázása
    public function getUsers()
    {
        $users = \App\Models\User::all();
        return response()->json($users);
    }
    // Admin statisztikák
    public function getStatistics()
    {
        $totalReports = \App\Models\Report::count();
        $totalUsers = \App\Models\User::count();
        $approvedReports = \App\Models\Report::where('status', 'approved')->count();
        $bannedUsers = \App\Models\User::where('role', 'banned')->count();

        // Leghitelesebb bejelentés (legtöbb pozitív szavazat - negatív szavazat)
        $reports = \App\Models\Report::with('votes')->get();
        $mostCredible = null;
        $mostIncredible = null;
        $maxScore = null;
        $minScore = null;
        foreach ($reports as $report) {
            $score = $report->votes->reduce(function ($sum, $v) {
                return $sum + ($v->vote_type === 'up' ? 1 : ($v->vote_type === 'down' ? -1 : 0));
            }, 0);
            if ($maxScore === null || $score > $maxScore) {
                $maxScore = $score;
                $mostCredible = $report;
            }
            if ($minScore === null || $score < $minScore) {
                $minScore = $score;
                $mostIncredible = $report;
            }
        }

        return response()->json([
            'total_reports' => $totalReports,
            'total_users' => $totalUsers,
            'approved_reports' => $approvedReports,
            'banned_users' => $bannedUsers,
            'most_credible_report' => $mostCredible,
            'most_incredible_report' => $mostIncredible,
        ]);
    }
}
