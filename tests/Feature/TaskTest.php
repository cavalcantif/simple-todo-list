<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskTest extends TestCase
{
    /**
     * Tests the post endpoint assotiated with the controller's store method
     *
     * @return void
     */
    public function test_post()
    {
        $response = $this->postJson('/api/tasks', [
            'description' => 'Task 1',
            'is_done' => false
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Task created.',
            'data' => [
                'id' => 1,
                'description' => 'Task 1',
                'is_done' => false
            ]
        ]);
    }

    /**
     * Tests a success scenario the get endpoint assotiated with the controller's show method
     *
     * @return void
     */
    public function test_get_by_key()
    {
        $response = $this->getJson('/api/tasks/1');

        $response->assertStatus(200);
        $response->assertJson([
            'id' => 1,
            'description' => 'Task 1',
            'is_done' => false
        ]);
    }

    /**
     * Tests a not found scenario the get endpoint assotiated with the controller's show method
     *
     * @return void
     */
    public function test_get_by_key_not_found()
    {
        $response = $this->getJson('/api/tasks/1000');

        $response->assertStatus(404);
        $response->assertJson([
            'errors' => ['Task not found.']
        ]);
    }

    /**
     * Tests a success scenario the put endpoint assotiated with the controller's store method
     *
     * @return void
     */
    public function test_put()
    {
        $response = $this->putJson('/api/tasks/1', [
            'description' => 'Task 1 Updated',
            'is_done' => true
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Task updated.',
            'data' => [
                'id' => 1,
                'description' => 'Task 1 Updated',
                'is_done' => true
            ]
        ]);
    }

    /**
     * Tests a not found scenario the put endpoint assotiated with the controller's update method
     *
     * @return void
     */
    public function test_put_not_found()
    {
        $response = $this->putJson('/api/tasks/1000', [
            'description' => 'This will fail',
            'is_done' => true
        ]);

        $response->assertStatus(404);
        $response->assertJson([
            'errors' => ['Task not found.']
        ]);
    }

    /**
     * Tests a success scenario the delete endpoint assotiated with the controller's destroy method
     *
     * @return void
     */
    public function test_delete()
    {
        $response = $this->deleteJson('/api/tasks/1');

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Task deleted.'
        ]);
    }

    /**
     * Tests a not found scenario the delete endpoint assotiated with the controller's destroy method
     *
     * @return void
     */
    public function test_delete_not_found()
    {
        $response = $this->deleteJson('/api/tasks/1000');

        $response->assertStatus(404);
        $response->assertJson([
            'errors' => ['Task not found.']
        ]);
    }
}
