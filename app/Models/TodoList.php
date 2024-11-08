<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    public $table = 'todo_lists';
    protected $fillable = ['id', 'user_id', 'content'];
}
