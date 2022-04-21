const mongoose = require("mongoose");

// 设置文档的数据结构
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    requierd: [true, "必须提供任务的名字"],
    trim: true,
    maxlength: [20, "名字的长度不能超过20"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//只有符合schema的数据才会被添加到数据库，其他的都会被忽略
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
