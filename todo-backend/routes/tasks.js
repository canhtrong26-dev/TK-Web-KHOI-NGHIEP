const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /api/tasks - Lấy tất cả
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/tasks/:id - Lấy chi tiết
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Không tìm thấy công việc' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/tasks - Tạo mới
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/tasks/:id - Cập nhật
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Không tìm thấy công việc' });
    }
    const { title, description, status } = req.body;
    await task.update({ title, description, status });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/tasks/:id - Xóa
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Không tìm thấy công việc' });
    }
    await task.destroy();
    res.json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;