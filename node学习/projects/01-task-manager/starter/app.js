const express = require('express');
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');

const app = express();

app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(express.static('public'));


// 处理404的中间件
const notFound = require('./middleware/not-found.js');
app.use(notFound);

// 错误处理
const errorHandlerMiddleWare = require('./middleware/error-handler.js');
app.use(errorHandlerMiddleWare);


const port = 80;

// 会在运行时自动读取根目录里.env文件的配置
require('dotenv').config();

// 如果数据库连接成功，然后才会开启服务器
connectDB(process.env.Mongo_URI)
  .then(() => {
    app.listen(port, console.log(`running on http://localhost:${port}`));
  })
  .catch(err => {
    console.log(err);
  })

