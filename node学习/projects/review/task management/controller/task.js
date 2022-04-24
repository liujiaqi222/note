const Task = require("../models/task");

const getAllTasks = (req, res) => {
  try {
    const results = await Task.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err });
  }
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
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({
      message: `No task width id: ${taskId}`
    })
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

// patch : update a task
const updateTask = (req, res) => {
  res.send("update a task");
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskId}` })
    }
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete a task
const deleteTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    // 如果task不存在
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskId}` });
    }
    res.status(200).json({ msg: 'task已经被成功删除' })
  } catch (err) {
    res.status(500).json({ message: err });

  }

};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
