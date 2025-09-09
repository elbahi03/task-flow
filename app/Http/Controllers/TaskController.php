<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
    use Carbon\Carbon;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');
        $tasks = $request->user()->tasks()->latest();

        // Filter by status if provided
        if ($status) {
            $tasks->where('status', $status);
        }
        $users = User::all();   
        return response()->json($tasks->paginate(10));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task=Task::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status
        ]);

        //$task = $request->user()->tasks()->create($data);
        return response()->json($task, 201);
    }

    public function show(Request $request, Task $task)
    {
        abort_unless($task->user_id === $request->user()->id, 403);
        
        // Add isDue status to the response
        $task->is_due = $task->isDue();
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        abort_unless($task->user_id === $request->user()->id, 403);

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:' . implode(',', [
                Task::STATUS_PENDING,
                Task::STATUS_IN_PROGRESS,
                Task::STATUS_COMPLETED
            ]),
        ]);

        $task->update($data);
        return response()->json($task);
    }

    public function destroy(Request $request, Task $task)
    {
        abort_unless($task->user_id === $request->user()->id, 403);
        $task->delete();
        return response()->json(null, 204);
    }

    public function markAsCompleted(Request $request, Task $task)
    {
        abort_unless($task->user_id === $request->user()->id, 403);
        $task->markAsCompleted();
        return response()->json($task);
    }

    public function markAsInProgress(Request $request, Task $task)
    {
        abort_unless($task->user_id === $request->user()->id, 403);
        $task->markAsInProgress();
        return response()->json($task);
    }
}
