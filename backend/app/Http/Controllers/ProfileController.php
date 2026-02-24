<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    // GET /api/profile - Profil adatok
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    // PUT /api/profile - Profil módosítás
    public function update(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:6',
        ]);

        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }
        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }
        if (isset($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }
        $user->save();
        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    // GET /api/users/{id}/reports - Felhasználó bejelentései
    public function userReports($id)
    {
        $user = User::findOrFail($id);
        $reports = $user->reports()->with(['category', 'images'])->get();
        return response()->json($reports);
    }
}
