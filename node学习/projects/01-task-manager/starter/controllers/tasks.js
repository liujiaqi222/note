const Task = require('../models/task.js')

// get all tasks
const getAllTasks = async (req, res) => {
  try {
    // find all documents
    const results = await Task.find({});
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// post: create new task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
// get a task
const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: `No task with id: ${taskId}` })
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// patch : update a task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // 第一个参数为id，第二个参数为要更新的数据，第三个参数为选项
    const task = await Task.findByIdAndUpdate(taskId, req.body,{new:true,runValidators:true});
    if (!task) return res.status(404).json({ message: `No task with id: ${taskId}` })
    res.status(200).json(task);
  } catch (err) {
    res.json(err);
  }
}

// delete a task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    // 如果task不存在
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskId}` });
    }
    res.status(200).json({ msg: 'task已经被成功删除' });
  } catch (err) {

  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
};

