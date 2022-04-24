const express = require("express");
const app = express();
const tasks = require("./routes/task.js");
const connectDB = require("./db/connection.js");
const notFound = require('./middleware/not-found.js')

// 解析json格式的表单，通过req.body直接就能获取到数据
app.use(express.json());
app.use("/api/v1/tasks", tasks);

// 404中间件
app.use(notFound);

app.get("/hello", (req, res) => {
  res.send("hello world");
});

const port = 80;

// 读取.env中的环境变量
require("dotenv").config();

// 如果数据库连接成功后再开启express服务器
connectDB(process.env.Mongo_URI).then(() => {
  app.listen(port, console.log(`running at http://localhost:${port}`));
});
