const Task = require('../models/task.js');
const asyncWrapper = require('../middleware/async.js');
const CustomError = require('../errors/custom-error.js');


// get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  // find all documents
  const results = await Task.find({});
  res.json(results);
});


// post: create new task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

// get a task
const getTask = asyncWrapper(async (req, res,next) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    // const err = new Error('task not found');
    // err.status = 404;
    // return next(err);
    return next(new CustomError(`task not found with id: ${taskId}`, 404));
  }
  res.status(200).json(task);
})

// patch : update a task
const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  // 第一个参数为id，第二个参数为要更新的数据，第三个参数为选项
  const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });
  if (!task) {
    return next(new CustomError(`task not found with id: ${taskId}`, 404));

  }
  res.status(200).json(task);

})

// delete a task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findByIdAndDelete(taskId);
  // 如果task不存在
  if (!task) {
    return next(new CustomError(`task not found with id: ${taskId}`, 404));
  }
  res.status(200).json({ msg: 'task已经被成功删除' });
})


module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
};

