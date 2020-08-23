<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = []; 
    // return $this->belongsTo('App\Category');
    function post(){
        return $this->belongsTo('App\Post');
    }
}
