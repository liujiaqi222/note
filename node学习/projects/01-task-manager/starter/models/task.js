const mongoose = require('mongoose');

// 设置文档的数据结构
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '必须提供任务的名字'],
    trim: true,
    maxLength:[20,'名字的长度不能超过20字符'],
  },
  completed: {
    type: Boolean,
    default:false
  },
})


module.exports = mongoose.model('Task', TaskSchema);
