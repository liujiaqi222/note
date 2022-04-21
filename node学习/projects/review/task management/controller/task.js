const Task = require("../models/task");

const getAllTasks = (req, res) => {
  res.send("all items");
};

// post: create new task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
// get a task
const getTask = (req, res) => {
  res.send("get a task");
};

// patch : update a task
const updateTask = (req, res) => {
  res.send("update a task");
};

// delete a task
const deleteTask = (req, res) => {
  res.send("delete a new task");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
