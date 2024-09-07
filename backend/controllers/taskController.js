const pool = require('../config/db');
const taskModel = require('../models/taskModel');

const createTask = async (req, res) => {
  const { title, description, priority, status } = req.body;
  const userId = req.user.id;
  const taskStatus = status || 'pending';

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, priority, status, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, priority, taskStatus, userId]
    );
    const taskId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);

    const newTask = rows[0];
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Create task error:', error.message);
    res.status(500).json({ error: 'Task creation failed. Please try again.' });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await taskModel.findTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Fetch tasks error:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks. Please try again.' });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
      const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Task not found.' });
      }
      res.status(200).json(rows[0]);
  } catch (error) {
      console.error('Error retrieving task by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve task. Please try again.' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;
  const userId = req.user.id;

  try {
    const updatedRows = await taskModel.updateTask(id, title, description, priority, status);
    if (updatedRows > 0) {
      res.json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found or not authorized' });
    }
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(500).json({ error: 'Task update failed. Please try again.' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedRows = await taskModel.deleteTask(id);
    if (deletedRows > 0) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found or not authorized' });
    }
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ error: 'Task deletion failed. Please try again.' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
