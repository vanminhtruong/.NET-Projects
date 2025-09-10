import { Router } from 'express';

const router = Router();

// In-memory store (replace with DB later)
let todos = [];
let nextId = 1;

// Create
router.post('/', (req, res) => {
  const { title, completed = false } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required (string)' });
  }
  const newTodo = { id: nextId++, title, completed: Boolean(completed), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Read all
router.get('/', (req, res) => {
  res.json(todos);
});

// Read one
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// Update (PUT full)
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  const { title, completed } = req.body || {};
  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'title (string) and completed (boolean) are required' });
  }

  const updated = { ...todos[index], title, completed, updatedAt: new Date().toISOString() };
  todos[index] = updated;
  res.json(updated);
});

// Patch (partial)
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  const { title, completed } = req.body || {};
  if (title !== undefined && typeof title !== 'string') {
    return res.status(400).json({ error: 'title must be string' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be boolean' });
  }

  const updated = { ...todos[index] };
  if (title !== undefined) updated.title = title;
  if (completed !== undefined) updated.completed = completed;
  updated.updatedAt = new Date().toISOString();

  todos[index] = updated;
  res.json(updated);
});

// Delete
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  const [deleted] = todos.splice(index, 1);
  res.json(deleted);
});

export default router;
