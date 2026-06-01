const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("createdBy", "name email");
    } else {
      tasks = await Task.find({
        createdBy: req.user.id
      });
    }

    res.status(200).json({
      success: true,
      tasks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Single Task
exports.getTaskById = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};