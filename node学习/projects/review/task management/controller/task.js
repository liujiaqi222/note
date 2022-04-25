const Task = require("../models/task");
const asyncWrapper = require('../middleware/async')
const CustomError = require('../errors/custom-error.js');


const getAllTasks = asyncWrapper(async (req, res) => {
  const results = await Task.find({});
  res.status(200).json(results);

})

// post: create new task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
})
// get a task
const getTask = asyncWrapper((req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {

    return next(new CustomError(`task not found with id: ${taskId}`, 404));
  }
  res.status(200).json(task);

});

// patch : update a task
const updateTask = asyncWrapper((req, res) => {
  res.send("update a task");
  const taskId = req.params.id;
  const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });
  if (!task) {
    return res.status(404).json({ message: `No task with id: ${taskId}` })
  }
  res.status(200).json(task)

});

// delete a task
const deleteTask = asyncWrapper((req, res) => {
  const taskId = req.params.id;
  const task = await Task.findByIdAndDelete(taskId);
  // 如果task不存在
  if (!task) {
    return res.status(404).json({ message: `No task with id: ${taskId}` });
  }
  res.status(200).json({ msg: 'task已经被成功删除' })
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
