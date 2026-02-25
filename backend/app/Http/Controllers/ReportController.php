<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Report;
use Illuminate\Support\Facades\Auth;


class ReportController extends Controller
{
    // GET /api/reports - Összes bejelentés listázása (szűrés, rendezés)
    public function index(Request $request)
    {
    $query = Report::with(['user', 'category', 'images', 'votes']);

        // Szűrés például státuszra
        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
        // Rendezés
        if ($request->has('sort_by')) {
            $direction = $request->input('sort_dir', 'asc');
            $query->orderBy($request->input('sort_by'), $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $reports = $query->get();
        return response()->json($reports);
    }

    // GET /api/reports/{id} - Egy bejelentés részletei
    public function show($id)
    {
        $report = Report::with(['user', 'category', 'images'])->findOrFail($id);
        return response()->json($report);
    }

    // POST /api/reports - Új bejelentés létrehozása
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'date' => 'required|date',
            'witnesses' => 'nullable|integer',
            'status' => 'nullable|string',
        ]);
        $report = new Report($validated);
        $report->user_id = Auth::id();
        $report->save();
        return response()->json(['message' => 'Report created successfully', 'report' => $report], 201);
    }

    // PUT /api/reports/{id} - Bejelentés módosítása
    public function update(Request $request, $id)
    {
        $report = Report::findOrFail($id);
        // Csak a saját bejelentés módosítható (ha szükséges)
        if ($report->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric',
            'date' => 'sometimes|date',
            'witnesses' => 'nullable|integer',
            'status' => 'nullable|string',
        ]);
        $report->update($validated);
        return response()->json(['message' => 'Report updated successfully', 'report' => $report]);
    }

    // DELETE /api/reports/{id} - Bejelentés törlése
    public function destroy($id)
    {
        $report = Report::findOrFail($id);
        // Csak a saját bejelentés törölhető (ha szükséges)
        if ($report->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $report->delete();
        return response()->json(['message' => 'Report deleted successfully']);
    }
        // GET /api/map/reports - Térképes megjelenítéshez összes bejelentés geo adatai
    public function mapReports()
    {
        $reports = Report::with('images')
            ->select('id', 'latitude', 'longitude', 'title', 'description')
            ->get()
            ->map(function ($report) {
                return [
                    'id' => $report->id,
                    'latitude' => $report->latitude,
                    'longitude' => $report->longitude,
                    'title' => $report->title,
                    'description' => $report->description,
                    'image' => $report->images->first()?->image_path,
                ];
            });
        return response()->json($reports);
    }
}
