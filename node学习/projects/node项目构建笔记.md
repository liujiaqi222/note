# task app

## 项目api

| 方法   | 路径              | 作用              |
| ------ | ----------------- | ----------------- |
| get    | /api/v1/tasks     | get all the tasks |
| post   | /api/v1/tasks     | create a new task |
| get    | /api/v1/tasks/:id | get single task   |
| patch  | /api/v1/tasks/:id | update task       |
| delete | /api/v1/tasks/:id | delete task       |



## 项目准备

安装好express：

```js
//app.js
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  res.send('hello world')
})

const port = 80;
app.listen(port, console.log(`running on http://localhost:${port}`));
```

创建routes文件夹：

```js
//routes/task.js
const express = require('express');
const router = express.router;

router.route('/').get((req,res) => {
  res.send('all items');
})

module.exports = router;
```

引入routes

```js
const express = require('express');
const app = express();

const tasks = require('./routes/tasks.js')
app.use('/api/v1/tasks', tasks);

const port = 80;
app.listen(port, console.log(`running on http://localhost:${port}`));
```



为了获取JSON请求的请求体(通过`req.body`)，我们可以使用内置的中间件。

```js
//app.js
app.use(express.json());
```

最后，我们把routes/tasks中的函数逻辑写在controller/tasks文件中。

```js
//route/tasks.js
const getAllTasks = (req, res) => {
  res.send('all items');
}

module.exports = {
  getAllTasks
};
```

相应的，将routes/tasks中的函数逻辑去掉。

```js
//routes/task.js
const express = require('express');
const router = express.Router();
const {getAllTasks}  = require('../controllers/tasks.js')

router.route('/').get(getAllTasks);

module.exports = router;

```



最后，文件夹目录如下：

![image-20220131171158147](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/image-20220131171158147.png)

接着，同样的设置好其他的api。

```js
//controller/tasks.js
// get all tasks
const getAllTasks = (req, res) => {
  res.send('get all tasks');
}

// post: create new task
const createTask = (req, res) => {
  res.send('create a new task')
}
// get a task
const getTask = (req, res) => {
  res.send('get a task')
}

// patch : update a task
const updateTask = (req, res) => {
  res.send('update a task')
}

// delete a task
const deleteTask = (req, res) => {
  res.send('delete a new task')
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
};
```

```js
//routes/task.js
const express = require('express');
const router = express.Router();
const { getAllTasks, createTask,getTask,updateTask,deleteTask } = require('../controllers/tasks.js')

router.route('/').get(getAllTasks).post(createTask);

router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
```

## 连接数据库

将使用 [mongoDB 云数据库](https://cloud.mongodb.com/)，它完全免费，只需要注册好账号即可。

![image-20220131181521685](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/image-20220131181521685.png)

点击database的 connect 按钮，将获取到连接的网址。

接着我们使用 [mongoose](https://mongoosejs.com/) 来操作数据库:

```bash
yarn add mongoose 
```

连接数据库，这里因为想要连接数据库成功后，再开启服务器，因此把连接数据库封装成了一个函数导出。

```js
//db/connection.js
const uri = "mongodb+srv://jiaqi:<密码>@cluster0.kqosu.mongodb.net/task-manager?retryWrites=true&w=majority";

const mongoose = require('mongoose');

const connectDB = () => {
  return mongoose.connect(uri);
}

module.exports = connectDB;
```

```js
//app.js
const express = require('express');
const tasks = require('./routes/tasks.js');

const app = express();
app.use(express.json());
app.use('/api/v1/tasks', tasks);

const port = 80;

const connectDB = require('./db/connect.js');
// 如果数据库连接成功，然后才会开启服务器
connectDB()
  .then(() => {
    app.listen(port, console.log(`running on http://localhost:${port}`));
  })
  .catch(err => {
    console.log(err);
  })
```



## 设置环境变量

当项目上传到github，我们可不想自己的密码直接暴露出去，这时候我们就可以设置好环境变量。

[这篇文章](https://www.jianshu.com/p/b076579eaff2)讲了几种设置环境变量的方法，这里我们使用`dotenv`设置环境变量。

```js
yarn add dotenv
```

我们将环境变量写在名字为 `.env` 文件中，**同时记得一定要在`.gitignore`中添加`.env`**。

![image-20220131193945575](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/image-20220131193945575.png)

`.env`中的键和值我们使用 `=` 来连接

```js
//.env
password = 123456
```

如果我们需要使用这个环境变量，则需要在使用前添加一句`require('dotenv').config()`，然后 `process.env` 就可以读取到刚才设置的键值。

```js
// 会在运行时自动读取根目录里.env文件的配置
require('dotenv').config();
console.log(process.env.password)
```

## 设置Models

mongodb数据库就是文档（document）的集合（connections）。

mongoose中`schema`定义document（文档）的结构，如数据类型和数据验证。而`model`则提供了接口（interface）来操作数据库，如增删改查。

**document是model的实例。**

创建一个新的文件夹`models`和新的task.js文件，内容如下：

```js
//models/task.js
const mongoose = require('mongoose');

// 设置文档的数据结构
const TaskSchema = new mongoose.Schema({
  name: String,
  completed:Boolean,
})

//只有符合schema的数据才会被添加到数据库，其他的都会被忽略

const Task = mongoose.model('Task', TaskSchema); //*

module.exports = Task;
```

`*行`中第一个参数为model的名字，`mongoose`自动创建该名字对应的复数小写形式的集合。即，Task是集合`tasks`的model。

![image-20220131202714921](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/image-20220131202714921.png)

document是model的实例，创建document很简单：

```js
//Task为model，然后会返回我们创建好的document
const task = await Task.create({name:'study',completed:false});
```

返回创建好的集合：

![image-20220131202838441](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/image-20220131202838441.png)

### 验证数据

mongoose自带[数据验证器](https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator)：

- 所有的[SchemaTypes](https://mongoosejs.com/docs/schematypes.html)都有必选的验证器。`checkRequired()`函数可以验证某个值是否是必须的。
- 数字类型有最大值和最小值验证器。
- 字符串有`enum`,`match`,`maxLength`验证器。

Mongoose还支持错误消息的基本模板。Mongoose替换`{value}`验证的值。

```js
const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Must be at least 6, got {VALUE}'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: {
      values: ['Coffee', 'Tea'],
      message: '{VALUE} is not supported'
    },
    required: function() {
      return this.bacon > 3;
    }
  }
});
```

另外还有一些配置如 `lowercase: true, trim: true`

```js
//models/task.js
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '必须提供任务的名字'],
    trim: true,
    maxLength:[20,'名字的长度不能超过20字符'],
  },
  completed: {
    type: Boolean,
    default:false //默认为false
  },
})
```

验证之后，我们需要`try catch`捕获验证失败的错误。

```js
//controllers/task.js
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({message:err});
  }  
}
```

## 操作数据

在[官方文档](https://mongoosejs.com/docs/queries.html)中可以找到各类的操作文档的api：

![image-20220131210901039](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/image-20220131210901039.png)

mongoose的query有两种执行方式：一是通过回调函数，mongoose会异步地query并且把执行的结果传给回调函数；二是通过`.then`函数，因此可以使用promise。

不过， Mongoose queries are **not** promises.They have a `.then()` function for [co](https://www.npmjs.com/package/co) and [async/await](http://thecodebarbarian.com/common-async-await-design-patterns-in-node.js.html) as a convenience. However, unlike promises, calling a query's `.then()` can execute the query multiple times.

### 获取所有tasks

如使用find且不传参数，可以获取到所有的数据

```js
// find all documents
await MyModel.find({});
```

```js
//controlers/task.js
const Task = require('../models/task.js')

// 获取所有的task
const getAllTasks = async(req, res) => {
  try {
    // find all documents
    const results = await Task.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({message:err});
  }
}
```

### 获取单个task

```js
// Find the adventure with the given `id`, or `null` if not found
await Adventure.findById(id);
```

```js
//controlers/task.js
// get a task
const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({message:`No task with id: ${taskId}`})
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
```

### 删除单个task

这里我们可以使用`Model.findByIdAndDelete()`。

> Finds a matching document, removes it, and passes the found document (if any) to the callback.

```js
//controlers/task.js
// delete a task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    // 如果task不存在
    if (!task) {
      return  res.status(404).json({ message: `No task with id: ${taskId}` });
    }
    res.status(200).json({msg:'task已经被成功删除'});
  } catch (err) {

  }
}
```

### task更新

我们可以使用`Model.findByIdAndUpdate()`:

```js
await  Model.findByIdAndUpdate(id, updates, options)
```

默认会返回的旧的document，如果想要获取新的数据，则可以设置options。

- `new`: bool - true to return the modified document rather than the original. defaults to false
- `upsert`: bool - creates the object if it doesn't exist. defaults to false.
- `runValidators`: if true, runs [update validators](https://mongoosejs.com/docs/validation.html#update-validators) on this command. Update validators validate the update operation against the model's schema.

```js
// patch : update a task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // 第一个参数为id，第二个参数为要更新的数据，第三个参数为选项
    const task = await Task.findByIdAndUpdate(taskId, req.body,{new:true,runValidators:true});
    if (!task) {
        return res.status(404).json({ message: `No task with id: ${taskId}` })
    }
    res.status(200).json(task);
  } catch (err) {
    res.json(err);
  }
}
```

