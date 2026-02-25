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
        $vote = Vote::withTrashed()->where([
            'user_id' => $user->id,
            'report_id' => $report->id,
        ])->first();

        if ($vote) {
            if ($vote->trashed()) {
                $vote->restore();
            }
            // Ha ugyanazt a szavazatot küldi újra, töröljük (visszavonás)
            if ($vote->vote_type === $validated['vote_type']) {
                $vote->delete();
            } else {
                // Másik típusra váltáskor töröljük a szavazatot (vissza 0-ra)
                $vote->delete();
            }
        } else {
            // Új szavazat
            $vote = new Vote([
                'user_id' => $user->id,
                'report_id' => $report->id,
                'vote_type' => $validated['vote_type'],
            ]);
            $vote->save();
        }

        // Szavazatok újraszámolása (csak aktív szavazatok)
        $votes = $report->votes()->whereNull('deleted_at')->get();
        $voteCount = $votes->reduce(function ($sum, $v) {
            return $sum + ($v->vote_type === 'up' ? 1 : ($v->vote_type === 'down' ? -1 : 0));
        }, 0);

        return response()->json([
            'message' => 'Vote submitted successfully',
            'vote_count' => $voteCount,
        ]);
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
