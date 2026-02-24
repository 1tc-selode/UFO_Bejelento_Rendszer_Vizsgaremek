<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'latitude',
        'longitude',
        'date',
        'witnesses',
        'status',
    ];

    // Egy bejelentéshez tartozó felhasználó
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Egy bejelentéshez tartozó kategória
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Egy bejelentéshez több kép tartozhat
    public function images()
    {
        return $this->hasMany(ReportImage::class);
    }

    // Egy bejelentéshez több szavazat tartozhat
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
