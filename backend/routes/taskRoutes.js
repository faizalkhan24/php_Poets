
const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, createTask);
router.get('/getall', authenticateToken, getTasks);
router.get('/get/:id', authenticateToken, getTaskById);
router.put('/update/:id', authenticateToken, updateTask);
router.delete('/delete/:id', authenticateToken, deleteTask);

module.exports = router;
