<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
    ];

    // Egy kategóriához több bejelentés tartozhat
    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}
