
const mongoose = require("mongoose");

// 将数据库连接封装成一个函数
const connectDB = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectDB;
