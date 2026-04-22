// Test helper for making HTTP requests to the app without starting a real server
const request = require('supertest');
// The Express app we want to test
const app = require('../src/app');

// Group all task-related API tests together
describe('Task API', () => {
  // We'll store the id of the task we create so later tests can use it
  let taskId;

  // Create a new task and save its id
  test('POST /tasks', async () => {
    // Send a POST request to create a task
    const res = await request(app)
      .post('/tasks')
      .send({ name: 'Test Task' });
    // Expect "created" status
    expect(res.statusCode).toBe(201);
    // Expect the response to include the task name we sent
    expect(res.body.name).toBe('Test Task');
    // Save the new task's id for later tests
    taskId = res.body.id;
  });

  // Get the list of tasks and make sure we have at least one
  test('GET /tasks', async () => {
    // Send a GET request for all tasks
    const res = await request(app).get('/tasks');
    // Expect "ok" status
    expect(res.statusCode).toBe(200);
    // Expect the list to have at least one task
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Fetch the single task we created by id
  test('GET /tasks/:id', async () => {
    // Send a GET request for the saved task id
    const res = await request(app).get(`/tasks/${taskId}`);
    // Expect "ok" status
    expect(res.statusCode).toBe(200);
    // Expect the returned task to match the id we saved
    expect(res.body.id).toBe(taskId);
  });

  // Update the task's name
  test('PUT /tasks/:id', async () => {
    // Send a PUT request to update the task
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ name: 'Updated Task' });
    // Expect "ok" status
    expect(res.statusCode).toBe(200);
    // Expect the response to show the updated name
    expect(res.body.name).toBe('Updated Task');
  });

  // Delete the task
  test('DELETE /tasks/:id', async () => {
    // Send a DELETE request for the task
    const res = await request(app).delete(`/tasks/${taskId}`);
    // Expect "no content" status (deleted)
    expect(res.statusCode).toBe(204);
  });
});
