<?php

namespace App\Jobs;

use App\Events\TodoReceived;
use App\Models\TodoList;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class TodoAdded implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public TodoList $todo)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        TodoReceived::dispatch([
            'id' => $this->todo->id,
            'user_id' => $this->todo->user_id,
            'text' => $this->todo->content,
            // 'time' => $this->todo->time,
        ]);
    }
}
