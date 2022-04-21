const router = require("express").Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/task");

router.route("/").get(getAllTasks).post(createTask);

router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);


module.exports = router;
