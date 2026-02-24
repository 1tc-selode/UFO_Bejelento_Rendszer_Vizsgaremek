<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vote extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'report_id',
        'user_id',
        'vote_type',
    ];

    // Egy szavazat egy bejelentéshez tartozik
    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    // Egy szavazat egy felhasználóhoz tartozik
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
