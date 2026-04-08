const request = require('supertest');
const app = require('../src/app');

describe('Task API', () => {
  let taskId;

  test('POST /tasks', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ name: 'Test Task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Task');
    taskId = res.body.id;
  });

  test('GET /tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /tasks/:id', async () => {
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  test('PUT /tasks/:id', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ name: 'Updated Task' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Task');
  });

  test('DELETE /tasks/:id', async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(204);
  });
});