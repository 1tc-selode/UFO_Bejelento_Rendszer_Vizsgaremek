<?php

namespace App\Http\Controllers;


use App\Models\Vote;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    // POST /api/reports/{id}/vote - Szavazás leadása
    public function vote(Request $request, $id)
    {
        $user = Auth::user();
        $report = Report::findOrFail($id);
        $validated = $request->validate([
            'vote_type' => 'required|in:up,down',
        ]);

        // Egy felhasználó csak egyszer szavazhat egy bejelentésre
        $vote = Vote::firstOrNew([
            'user_id' => $user->id,
            'report_id' => $report->id,
        ]);
        $vote->vote_type = $validated['vote_type'];
        $vote->save();

        return response()->json(['message' => 'Vote submitted successfully']);
    }

    // GET /api/reports/{id}/credibility - Hitelességi pontszám
    public function credibility($id)
    {
        $report = Report::findOrFail($id);
        $upVotes = $report->votes()->where('vote_type', 'up')->count();
        $downVotes = $report->votes()->where('vote_type', 'down')->count();
        $score = $upVotes - $downVotes;
        return response()->json([
            'report_id' => $report->id,
            'credibility_score' => $score,
            'up_votes' => $upVotes,
            'down_votes' => $downVotes,
        ]);
    }
}
