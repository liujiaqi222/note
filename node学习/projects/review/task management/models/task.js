const mongoose = require("mongoose");

// 设置文档的数据结构
const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

//只有符合schema的数据才会被添加到数据库，其他的都会被忽略
