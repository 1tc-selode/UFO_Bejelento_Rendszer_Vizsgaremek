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

    // Felhasználó tiltása
    public function banUser($id)
    {
        $user = \App\Models\User::findOrFail($id);
        $user->role = 'banned';
        $user->save();
        return response()->json(['message' => 'User banned successfully']);
    }

    // Admin statisztikák
    public function getStatistics()
    {
        $totalReports = \App\Models\Report::count();
        $totalUsers = \App\Models\User::count();
        $approvedReports = \App\Models\Report::where('status', 'approved')->count();
        $bannedUsers = \App\Models\User::where('role', 'banned')->count();
        return response()->json([
            'total_reports' => $totalReports,
            'total_users' => $totalUsers,
            'approved_reports' => $approvedReports,
            'banned_users' => $bannedUsers,
        ]);
    }
}
