
const pool = require('../config/db');

const createTask = async (title, description, priority, status, userId) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, priority, status, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, priority, status, userId]
    );
    return result.insertId;
  } catch (error) {
    throw new Error('Error creating task: ' + error.message);
  }
};

const findTasksByUserId = async (userId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
  } catch (error) {
    throw new Error('Error finding tasks: ' + error.message);
  }
};

const findTaskById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error finding task by ID: ' + error.message);
  }
};

const updateTask = async (id, title, description, priority, status) => {
  try {
    const [result] = await pool.query(
      'UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?',
      [title, description, priority, status, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error('Error updating task: ' + error.message);
  }
};

const deleteTask = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    throw new Error('Error deleting task: ' + error.message);
  }
};

module.exports = {
  createTask,
  findTasksByUserId,
  findTaskById,
  updateTask,
  deleteTask
};
