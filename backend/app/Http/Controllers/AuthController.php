<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
	// Regisztráció
	public function register(Request $request)
	{
		$validated = $request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6',
		]);

		$user = new \App\Models\User();
		$user->name = $validated['name'];
		$user->email = $validated['email'];
		$user->password = bcrypt($validated['password']);
		$user->role = 'user';
		$user->save();

		return response()->json(['message' => 'Registration successful'], 201);
	}

	// Bejelentkezés (Bearer token visszaadása)
	public function login(Request $request)
	{
		$validated = $request->validate([
			'email' => 'required|string|email',
			'password' => 'required|string',
		]);

		$user = \App\Models\User::where('email', $validated['email'])->first();
		if (!$user || !\Illuminate\Support\Facades\Hash::check($validated['password'], $user->password)) {
			return response()->json(['message' => 'Invalid credentials'], 401);
		}

		$token = $user->createToken('auth_token')->plainTextToken;
		return response()->json([
			'access_token' => $token,
			'token_type' => 'Bearer',
		]);
	}

	// Kijelentkezés (token érvénytelenítése)
	public function logout(Request $request)
	{
		$request->user()->currentAccessToken()->delete();
		return response()->json(['message' => 'Logged out successfully']);
	}

	// Bejelentkezett felhasználó adatai
	public function user(Request $request)
	{
		return response()->json($request->user());
	}
}
