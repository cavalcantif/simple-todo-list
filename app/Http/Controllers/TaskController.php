<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Exception;
use \Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws Exception
     */
    public function index() : JsonResponse
    {
        try
        {
            return response()->json(Task::orderBy('is_done')->get());
        }
        catch (Exception $exception)
        {
            return response()->json([
                'errors' => [$exception->getMessage()]
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\CreateTaskRequest  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws Exception
     */
    public function store(CreateTaskRequest $request) : JsonResponse
    {
        try
        {
            $task = Task::create($request->validated());

            return response()->json([
                'message' => 'Task created.',
                'data' => $task
            ]);
        }
        catch (Exception $exception)
        {
            return response()->json([
                'errors' => [$exception->getMessage()]
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     * @throws Exception
     */
    public function show(int $id) : JsonResponse
    {
        try
        {
            return response()->json(Task::findOrFail($id));
        }
        catch (ModelNotFoundException $exception)
        {
            return response()->json([
                'errors' => ['Task not found.']
            ], 404);
        }
        catch (Exception $exception)
        {
            return response()->json([
                'errors' => [$exception->getMessage()]
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\UpdateTaskRequest;  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     * @throws Exception
     */
    public function update(UpdateTaskRequest $request, int $id) : JsonResponse
    {
        try
        {
            $task = Task::findOrFail($id);

            $task->update($request->validated());

            return response()->json([
                'message' => 'Task updated.',
                'data' => $task
            ]);
        }
        catch (ModelNotFoundException $exception)
        {
            return response()->json([
                'errors' => ['Task not found.']
            ], 404);
        }
        catch (Exception $exception)
        {
            return response()->json([
                'errors' => [$exception->getMessage()]
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     * @throws Exception
     */
    public function destroy(int $id) : JsonResponse
    {
        try
        {
            $task = Task::findOrFail($id);

            $task->delete();

            return response()->json(['message' => 'Task deleted.'], 200);
        }
        catch (ModelNotFoundException $exception)
        {
            return response()->json([
                'errors' => ['Task not found.']
            ], 404);
        }
        catch (Exception $exception)
        {
            return response()->json([
                'errors' => [$exception->getMessage()]
            ], 500);
        }
    }
}
