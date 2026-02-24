<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Összes kategória listázása
    public function index()
    {
        $categories = \App\Models\Category::all();
        return response()->json($categories);
    }

    // Egy kategória részletei
    public function show($id)
    {
        $category = \App\Models\Category::findOrFail($id);
        return response()->json($category);
    }

    // Új kategória létrehozása (csak Admin)
    public function store(Request $request)
    {
        $this->authorize('admin'); // vagy middleware-rel védeni
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $category = \App\Models\Category::create($validated);
        return response()->json($category, 201);
    }

    // Kategória módosítása (csak Admin)
    public function update(Request $request, $id)
    {
        $this->authorize('admin');
        $category = \App\Models\Category::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $category->update($validated);
        return response()->json($category);
    }

    // Kategória törlése (csak Admin)
    public function destroy($id)
    {
        $this->authorize('admin');
        $category = \App\Models\Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
