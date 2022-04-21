const getAllTasks = (req, res) => {
  res.send("all items");
};


// post: create new task
const createTask = (req, res) => {
  res.send("create a new task");
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