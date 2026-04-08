const express = require('express');
const router = express.Router();

let tasks = [];
let idCounter = 1;

// Create task
router.post('/', (req, res) => {
  const task = { id: idCounter++, ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// Get all tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// Get task by ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Update task
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });

  Object.assign(task, req.body);
  res.json(task);
});

// Delete task
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
});

module.exports = router;