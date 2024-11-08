<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function __construct() {
        // $this->middleware('auth');
    }
    public function index() {
        $user = User::where('id', auth()->id())->select([
            'id', 'name', 'email',
        ])->first();

        return view('todo', [
            'user' => $user,
        ]);
    }

    public function todos(){
        $id = auth()->id();
        $todos = TodoList::find($id);

        return response()->json($todos);    
    }

    public function todo(Request $request): JsonResponse {
        $todo = TodoList::create([
            'user_id' => auth()->id(),
            'content' => $request->get('content'),
        ]);
        // SendMessage::dispatch($todo);

        return response()->json([
            'success' => true,
            'message' => "Todo created and job dispatched.",
        ]);
    }
}
