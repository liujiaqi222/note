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
const router = express.Router();

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

自 `Express 4.16.0` 版本开始，`Express` 内置了 3 个常用的中间件，极大的提高了 `Express` 项目的开发效率和体验

1. `express.static` 快速托管静态资源的内置中间件，例如： HTML 文件、图片、`CSS` 样式等（无兼容性）
2. `express.json` 解析 `JSON` 格式的请求体数据（**有兼容性**，仅在 `4.16.0+` 版本中可用）
3. `express.urlencoded` 解析 `URL-encoded` 格式的请求体数据（**有兼容性**，仅在 `4.16.0+` 版本中可用）

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

![image-20220131171158147](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220131171158147.png)

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

![image-20220131181521685](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220131181521685.png)

![image-20220421204824537](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220421204824537.png)

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

![image-20220131193945575](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220131193945575.png)

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

![image-20220131202714921](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220131202714921.png)

document是model的实例，创建document很简单：

```js
//Task为model，然后会返回我们创建好的document
const task = await Task.create({name:'study',completed:false});
```

返回创建好的集合：

![image-20220131202838441](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220131202838441.png)

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



### 创建数据

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

![image-20220131210901039](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220131210901039.png)

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
    res.status(500).json({ message: err });
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
    res.status(500).json(err);
  }
}
```

## 代码优化

### 自定义404页面

```js
//app.js
const express = require('express');
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');

const app = express();

app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use(express.static('public'))

// 处理404的中间件
const notFound = require('./middleware/not-found.js');
app.use(notFound);


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

```

```js
//middleware/not-found.js

const notFound = (req, res, next) => {
  res.status(404).send('资源不存在');
}

module.exports = notFound;
```

### 包装try和catch

在`controler/task.js`中写了超级多的try和catch，因此我们可以使用一个函数来包装try和catch。

![image-20220201131251648](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220201131251648.png)

这个函数，接收原来try的逻辑作为函数参数，而它同时又会返回一个函数，这个函数可以获取到express传入的`req,res,next`。最后，它将catch到的error交给next中间件来处理（这个中间件我们还没有设置）。

```js
//middleware/async.js
const asyncWrapper = fn => {
  return async (req, res,next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
   }
  }
}

module.exports = asyncWrapper;
```

之前的try catch代码就可以改写为

```js
//controler/task.js

//原来
// get all tasks
const getAllTasks = async (req, res) => {
  try {
    // find all 
    const results = await Task.find({});
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

//优化后
// get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  // find all documents
  const results = await Task.find({});
  res.json(results);
});
```

### 错误处理器

[官网：express的默认错误处理器](http://expressjs.com/en/guide/error-handling.html#error-handling)

**If you pass an error to `next()` and you do not handle it in a custom error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace.** 

Define error-handling middleware functions in the same way as other middleware functions, except error-handling functions have four arguments instead of three: `(err, req, res, next)`. For example:

```js
app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})
```

```js
//middleware/error-handler.js
const errorHandlerMiddleWare = (err, req, res, next) => {
  return res.status(500).json({ err});
}
module.exports = errorHandlerMiddleWare;
```

```js
//app.js
//略
// 错误处理
const errorHandlerMiddleWare = require('./middleware/error-handler.js');
app.use(errorHandlerMiddleWare);
```

除了状态码为500的错误，我们还可以处理状态码为404的错误。我们主动定义一个错误，然后传递给`next`中间件。

```js
const getTask = asyncWrapper(async (req, res,next) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    const err = new Error('task not found');
    err.status = 404;
    return next(err);
  }
  res.status(200).json(task);
})
```

这里定义错误写了2行代码，因此我们可以自定义一个error类，让其继承自原生的类并且多一个statusCode。

```js
//errors/custom-errors
class CustomError extends Error{
  constructor(message,statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
```

接着，404错误就可以写为：

```js
const CustomError = require('../errors/custom-error.js');
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
```

然后把wrapper的catch的错误也用自定义的类来声明错误：

```js
const CustomError = require('../errors/custom-error.js');
const asyncWrapper = fn => {
  return async (req, res,next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(new CustomError(err,500));
   }
  }
}
module.exports = asyncWrapper;
```

错误处理中间件就变为了：

```js
//middleware/error-handler.js
const errorHandlerMiddleWare = (err, req, res, next) => {
  return res.status(err.statusCode).json({ msg:err.message});
}
module.exports = errorHandlerMiddleWare;
```

# store api

## 项目准备

### 基本代码

首先安装好express和dotenv，然后写好基本的代码。

```js
require('dotenv').config();
const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>store api <a href ="/api/v1/products">products route</a></h1>')
})

//错误处理中间件
app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connect db
    app.listen(port, console.log('running at http://localhost:3000'));
  } catch (err) {
    console.log(err);
  }
}

start();
```

其中`not-found`和`error-handler`的代码如下：

```js
//middleware/not-found
const notFound = (req, res) => res.status(404).send('Route does not exist')
module.exports = notFound;
```

```js
//middleware/error-handler
const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware
```



### 连接数据库

和之前一样，创建了一个连接数据库的函数，然后在开启服务器之前连接数据库。

```js
//db/connect.js
const mongoose = require('mongoose');

const connectDB = (uri) => {
  return mongoose.connect(uri);
}

module.exports = connectDB;
```

与此同时，把数据库的链接放到`.env`中，然后再到主程序中调用连接数据库的函数。

```js
//app.js
const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log('running at http://localhost:3000'));
  } catch (err) {
    console.log(err);
  }
}

start();
```

### 设置router

```js
//routes/products
const express = require("express");

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('hello world')
})

module.exports = router;
```

```js
//app.js
const router = require('./routes/products.js');
app.use('/api/v1/products', router);
```

接着把routes中的逻辑代码放在controller中。

```js
//controller/products.js
const getAllProductsStatics = async (req, res, next) => {
  res.status(200).json({ msg: 'products testing route' })
}
const getAllProducts = async (req, res, next) => {
  res.status(200).json({ msg: 'getAllProducts' })
}

module.exports = {
  getAllProductsStatics,
  getAllProducts
}
```

```js
//routes/products.js
const express = require("express");
const router = express.Router();
const { getAllProductsStatics, getAllProducts } = require('../controllers/products.js');

router.route('/').get(getAllProducts);
router.route('/statics').get(getAllProductsStatics);

module.exports = router;
```

### 数据库错误处理

之前，我们在路由中请求数据库的数据是使用`try catch`或者自行创建了一个`async wrapper`，但是我们可以直接使用别人写好的包`express-async-errors`。

```bash
yarn add express-async-errors
```

我们只需要使用它之前require它一下，其他什么的不用管了。

```js
const express = require('express');
require('express-async-errors');
const User = require('./models/user');
const app = express();
 
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});
```

之后如果mongoose抛出错误，这个npm包会自动帮我们捕获，进入到错误处理中间件。

## 设置models

```js
const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '必须提供产品名字']
  },
  price: {
    type: Number,
    required: [true, '必须提供产品价格']
  },
  featured: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default:4.5,
  },
  createAt: {
    type: Date,
    default:Date.now()
  },
  // 公司限定为如下四个值
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message:'{VALUE}不支持'
    },
  }
})

module.exports = mongoose.model('Product', productsSchema);
```

## 填充数据

在`products.json`中准备了一些数据，因此我们将它们写入数据库中。

![image-20220202000634814](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220202000634814.png)

因为json中的数据是一个数组，因此我们甚至不用遍历数组，直接`Model.create()`，mongoose就会帮助我们写入单个document。

```js
//populate.js
require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product')

// 厉害了 JSON数据直接require就能获取
const jsonProducts = require('./products.json')


// 把数据填充到database中
const start = async () => {
  try {
    // 连接数据库
    await connectDB(process.env.MONGO_URI);
     // 删除之前所有的数据
    await Product.deleteMany();
    // 把json中的所有数据写入数据库，这里传入的数组，数组里面有很多对象
    await Product.create(jsonProducts);
    process.exit(0)；//退出node程序
  } catch (err) {
    console.log(err);
     process.exit(1)
  }

}

start();
```



![image-20220202001653212](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220202001653212.png)

## 数据查询

首先了解一下数据库的数据查询api：

- [`Model.find()`](https://mongoosejs.com/docs/api.html#model_Model.find)
- [`Model.findById()`](https://mongoosejs.com/docs/api.html#model_Model.findById)
- [`Model.findByIdAndDelete()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete)
- [`Model.findByIdAndRemove()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)
- [`Model.findByIdAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
- [`Model.findOne()`](https://mongoosejs.com/docs/api.html#model_Model.findOne)
- [`Model.findOneAndDelete()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete)
- [`Model.findOneAndRemove()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)
- [`Model.findOneAndReplace()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndReplace)
- [`Model.findOneAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)

```js
await Product.find({}) // 传入空对象返回所有的数据
await Product.find({ featured: true }) // 查找所有的feature为true的数据
```

然后在网址中的query参数，在express中可以通过`req.query`获取到。

<img src="https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220426202010100.png" alt="image-20220426202010100" style="zoom:50%;" />

```js
./controlers/products.js
const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true })
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query)
  res.status(200).json({ products})
}

module.exports = {
  getAllProducts, getAllProductsStatic
}
```

用户可能会传了一些数据库根本没有的属性，此时我们可以这样来解决。

从 `res.query` 解析出我们想要的数据，然后判断这些数据是否存在，再进行查询。

` {$regex:name,$options:'i'}` 见[官网文档](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)

```js
const getAllProducts = async (req, res) => {
  const { featured, company,name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if(name){
    // 正则匹配name，大小写不敏感
    queryObject.name = {$regex:name,$options:'i'};  
  }
  const products = await Product.find(queryObject)
  res.status(200).json({ length: products.length, products })
}
```

数据排序：如以name字段进行排序

```js
const products = await Product.find(queryObject).sort('name')
```

当然，用户可能同时希望对name进行升序排序，price进行降序排序，如：

`http://localhost:3000/api/v1/products?sort=name,-price`

使用mongoose查询的格式为`name -price`，用空格分隔即可。

```js
const products = await Product.find(queryObject).sort('name -price')
```

如果只想显示几个特定字段的结果，可以使用`select`。

```js
const products = await Product.find(queryObject).select('name price')
```

<img src="https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220508123444683.png" alt="image-20220508123444683" style="zoom:50%;" />

如果想要限制返回结果的数量，可以使用`limit`。如果想要实现分页功能，可以配合`skip`一起实现。

```js
const products = await Product.find(queryObject).limit(10).skip(10);
```

如果想要筛选价格大于30和评分大于等于4的元素，我们可以这样写：

```js
const products = await Product.find({ price: { $gt: 30 } ,rating:{$gte:4}})
```

符号的对应关系如下：

```js
const operatorMap = {
  '>': '$gt',
  '>=': '$gte',
  '=': '$eq',
  '<': '$lt',
  '<=': '$lte',
}
```

全部代码：

```js
const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true })
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
    
  const queryObject = {};
    
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // 正则匹配name，大小写不敏感
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    // 将price>40, rating>=4
    // 替换为 price-$gt-10,rating-$gte-4
    let filters = numericFilters.replace(regEx, match => {
      return `-${operatorMap[match]}-`
    });
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }

    })
  }
  let products = Product.find(queryObject)
  if (sort) {
    const sortList = sort.split(',').join(' ');
    console.log(sortList);
    products = products.sort(sortList)
  } else {
    // 如果用户没有传递参数，则根据时间来排序
    products = products.sort('createdAt');
  }
  if (fields) {
    const fieldList = fields.split(',').join(' ');
    products = products.select(fieldList)
  }
  //queryObject { price: { '$gt': 10 }, rating: { '$gte': 4 } }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  products = await products.skip(skip).limit(limit);
  res.status(200).json({ length: products.length, products })
}

module.exports = {
  getAllProducts, getAllProductsStatic
}
```



# JWT

## 基本配置

前面都已经写了2遍，因此不再重复，以下为代码：

```js
// app.js
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

const mainRouter = require('./routes/main')
app.use('/api/v1', mainRouter);
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
```

```js
//router/main.js
const router = require('express').Router();
const {login,dashboard} = require('../controllers/main');

router.route('/dashboard').get(dashboard);
router.route('/login').post(login);
console.log(router);

module.exports = router;
```

```js
//controller/main.js
const login = async (req, res) => {
  res.send('login')
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: 'hello',
    secret: `here is your authorized data,your lucky number is ${luckyNumber}`
  })
}

module.exports = {
  login, dashboard
}
```

## JWT的应用

官网：https://jwt.io/



![image-20220508161934262](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220508161934262.png)

我们使用的包是`jsonwebtoken`，用来生成和解码jwt。

```js
const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(process.env.JWT_SECRET);
  if (!username || !password) {
    console.log(new CustomAPIError('please provide email and password', 400) instanceof CustomAPIError);
    throw new CustomAPIError('please provide email and password', 400);
  }
  const id = Date.now();
  // 第一个参数是payload，第二个参数是secret，最后一个参数是options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  res.status(200).json({ msg: 'user created', token })
}
```



这里就没有连接数据库，只要用户提供了用户名和密码，就生成了token。

```js
// 第一个参数是payload，第二个参数是secret，最后一个参数是options
const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
});
```

接着前端就得到了返回的token，然后我们把这个token存在localStorage中

```js
const { data } = await axios.post('/api/v1/login', { username, password });
localStorage.setItem('token', data.token);

```

之后，请求dashboard的时候，就把token放在headers中。

```js
const token = localStorage.getItem('token')
try {
  const { data } = await axios.get('/api/v1/dashboard', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  
} catch (error) {
  localStorage.removeItem('token')
}
```

当前端请求dashboard的时候，我们就验证它的token是否正确。

```js
const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomAPIError('No token provided', 400);
  }
  const token = authHeader.split(' ')[1];

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); //decoded就是之前的payload
  } catch (err) {
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: 'hello',
    secret: `here is your authorized data,your lucky number is ${luckyNumber}`
  })
}

```

关键代码就是这一行：

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

全部代码：

```js
const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(process.env.JWT_SECRET);
  if (!username || !password) {
    throw new CustomAPIError('please provide email and password', 400);
  }
  const id = Date.now();
  // 第一个参数是payload，第二个参数是secret，最后一个参数是options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomAPIError('No token provided', 401);
  }
  const token = authHeader.split(' ')[1];

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); //decoded就是之前的payload
  } catch (err) {
    throw new CustomAPIError('Not authorized to access this route', 401);

  }

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: 'hello',
    secret: `here is your authorized data,your lucky number is ${luckyNumber}`
  })
}

module.exports = {
  login, dashboard
}
```

## 代码优化

因为可能不止一个route需要验证后才能访问，因为我们可以设计一个中间件来避免重复写token验证的逻辑。

```js
// middleware/auth.js
const { BadRequestError, UnauthenticatedError } = require('../errors/index.js');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('No token provided');
  }
  const token = authHeader.split(' ')[1];
  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next(); // 一定不要忘记了这个next，不然进入不了下一个route

  } catch (err) {
    throw new BadRequestError('Not authorized to access this route');
  }
}

module.exports = authenticationMiddleware
```

注意这里，必须记得写`next()`，另外这里把decoded出来的值赋予给了`req`，因此之后dashboard这个路由可以获取到解码后的信息。

然后我们在进入到`dashboard`这个路由之前进行token验证：

```js
const router = require('express').Router();
const {login,dashboard} = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth')

// 在能访问dashboard之前需要验证token
router.route('/dashboard').get(authenticationMiddleware,dashboard);
router.route('/login').post(login);

module.exports = router;
```

最关键的代码就是这一行：

```js
router.route('/dashboard').get(authenticationMiddleware,dashboard);
```

---

接着，我们还另外写了一些error类。

```js
//errors/index.js
const { StatusCodes } = require('http-status-codes');

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}


class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}


module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError
}
```

然后这里还用到了一个包`http-status-codes`，目的就是不用手写status-code。

![image-20220508182634774](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220508182634774.png)



# 04.Job Api



## 基本配置

```js
// app.js
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
// connectdb
const connectDB = require('./db/connect')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
  await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`running at http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();//app.js
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`running at http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
```

```js
//routes/auth.js
const router = require('express').Router();
const { register, login } = require('../controllers/auth');

router.post('/register', register);

router.post('/login', login);
module.exports = router;
```

```js
//routes/jobs.js
const router = require('express').Router();
const { getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob } = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);
module.exports = router;
```

```js
// controller/auth.js
const register = async (req, res) => {
  res.send('register user');
}

const login = async (req, res) => {
  res.send('register login');
}

module.exports={
  register, login
}
```

```js
// controller/jobs.js
const getAllJobs = async (req, res) => {
  res.send('register user');
}
const getJob = async (req, res) => {
  res.send('getJob');
}
const createJob = async (req, res) => {
  res.send('createJob');
}
const updateJob = async (req, res) => {
  res.send('updateJob');
}
const deleteJob = async (req, res) => {
  res.send('delete job');
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
```

## 设置Model

```js
//model/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'please provide a email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
  }
})

module.exports = mongoose.model('User',UserSchema);
```

用户的密码我们需要hash加密后存储在数据库，但是要记住hashing is a one-way street，it can't be reversed.

### 密码加密

我们使用的npm包是 `bcryptjs`:

```js
//controllers/auth.js
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword })
  res.status(StatusCodes.CREATED).json({
    user
  })
}

const login = async (req, res) => {
  res.send('register login');
}

module.exports = {
  register, login
}
```

关键代码就2行：

```js
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

然后这个加密的操作可以用`moogoose`的中间件来实现：

```js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  //省略
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

module.exports = mongoose.model('User', UserSchema);

```

然后controller中的代码又减少了：

```js
//controller/auth.js
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({
    user
  })
}

const login = async (req, res) => {
  res.send('register login');
}

module.exports = {
  register, login
}
```



### 生成token

```js
//controllers/auth.js
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = jwt.sign({userId:user._id,name:user.name},'jwtsercret',{
    expiresIn:'30d'
  })
  res.status(StatusCodes.CREATED).json({
    token,user:{name:user.name}
  })
}
```



不过我们可以使用mongoose的实例方法。注意定义实例方法的时候，不要使用箭头函数。

> Instances of `Models` are [documents](https://mongoosejs.com/docs/documents.html). Documents have many of their own [built-in instance methods](https://mongoosejs.com/docs/api/document.html). We may also define our own custom document instance methods.

```js
// define a schema
const animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return mongoose.model('Animal').find({ type: this.type }, cb);
};
```

Now all of our `animal` instances have a `findSimilarTypes` method available to them.

```js
const Animal = mongoose.model('Animal', animalSchema);
const dog = new Animal({ type: 'dog' });

dog.findSimilarTypes((err, dogs) => {
  console.log(dogs); // woof
});
```

因此我们在定义schema的文件中增加如下代码

```js
//models/User.js
//注意不要使用箭头函数，在这里的this指向刚刚创建好的document
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, 'jwtsercret', {
    expiresIn: '30d'
  })
}
```

接着在controller中调用即可。

```js
//controllers/auth.js
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({
    token: user.createJWT(), user: { name: user.name }
  })
}

```

### token secret

可以在[这个网站](https://www.allkeysgenerator.com/)生成token的secret，然后将它放在`.env`。

![image-20220515110425379](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/image-20220515110425379.png)

## 实现登陆功能

最重要的一步就是要检查用户的密码是否正确，同样可以给mongoose的实例添加方法来进行验证

```js
//model/User.js
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch;
}
```

接着，在controller中，当我们查询到user后就可以进行密码对比了

```js
//controllers/auth.js
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password!')
  }
  // 根据邮箱查找用户
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid email');
  }
  // 调用user的comparePassword方法对比密码
  const isPasswordCorrect = await user.comparePassword(String(password))
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  res.status(StatusCodes.OK).json({
    token: user.createJWT(), user: { name: user.name }
  })
}
```

## token验证

```js
// middleware/authentication.js
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/index')



const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job route
    req.user = {
      userId: payload.userId,
      name:payload.name,
    }
    next()
  } catch (err) {
    throw new UnauthenticatedError('Authentication invalid');

  }

}

module.exports = auth;
```

由于所有的job routes都需要token验证，因此我们把这个中间件放在app.js中。

```js
const authenticateUser = require('./middleware/authentication')
app.use('/api/v1/jobs', authenticateUser,jobsRouter);
```

## 设置Job model

这里有个第2个选项：`timeStamp:true`，可以创建的document增加createAt和updateAt两个属性。

> The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. 

```js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    require: [true, 'Please provide company name'],
    maxlength: 20,
  },
  position: {
    type: String,
    require: [true, 'Please provide position name'],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ['interview', 'decline', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user id']

  }
}, {
  // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. 
  timestamps: true
})

module.exports = mongoose.model('Job', JobSchema)
```

