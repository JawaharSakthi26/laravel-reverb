@extends('layouts.app')

@section('content')
    <div class="container">
        <div id="main-todo" data-user="{{ json_encode($user) }}"></div>
    </div>
@endsection