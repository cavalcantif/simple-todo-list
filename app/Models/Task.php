<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * Attributes that should be hidden for arrays.
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * All fields can be mass assigned
     */
    protected $guarded = [];

    /**
     * Converts the is_done field to boolean data type
     */
    protected $casts = [
        'is_done' => 'boolean'
    ];
}
