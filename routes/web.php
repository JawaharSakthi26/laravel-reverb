<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TodoController;

Route::get('/', function () { return view('welcome'); });

Route::get('register', [RegisterController::class, 'showRegistrationForm'])->middleware('guest');
Route::post('register', [RegisterController::class, 'register'])->middleware('guest');

Auth::routes();

Route::get('/home', [HomeController::class, 'index'])
    ->name('home');
Route::get('/messages', [HomeController::class, 'messages'])
    ->name('messages');
Route::post('/message', [HomeController::class, 'message'])
    ->name('message');


Route::get('/home-todo', [HomeController::class, 'todo_home'])
    ->name('todo_home');
Route::get('/todos', [HomeController::class, 'todos'])
    ->name('todos');
Route::post('/todo', [HomeController::class, 'todo'])
    ->name('todo');
