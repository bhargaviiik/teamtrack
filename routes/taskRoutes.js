const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a task under a project
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    // confirm the project exists and the user is actually a member of it
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (!projectDoc.members.some(m => m.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not a member of this project' });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks/project/:projectId
// @desc    Get all tasks for a specific project
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks/my-tasks
// @desc    Get all tasks assigned to the logged-in user, across all projects
router.get('/my-tasks', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate('project', 'title')
      .sort({ dueDate: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task (status, assignment, etc.)
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // only fields sent in the request get updated — everything else stays as is
    Object.assign(task, req.body);
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/tasks/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;