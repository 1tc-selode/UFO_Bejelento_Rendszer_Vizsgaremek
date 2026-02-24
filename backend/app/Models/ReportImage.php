<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReportImage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'report_id',
        'image_path',
    ];

    // Egy kép egy bejelentéshez tartozik
    public function report()
    {
        return $this->belongsTo(Report::class);
    }
}
