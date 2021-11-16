# 快速上手

a. 安装express，当前使用的是4.17版本。

在终端中输入以下命令：

```bash
yarn add express
```

b. 创建一个'app.js'文件，引入express，创建express实例，并监听端口3000。

```js
//app.js
const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
```

在终端中输入以下命令：

```bash
yarn add nodmon #用于实时更新node代码
nodemon app.js # 开始运行代码
```

c. 当客户端访问的http://localhost:3000的时候，给客户端的get请求返回内容，可以使用`res.send()`方法。

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // 发送状态码
  res.send('hi express')
});


app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
```

或者使用`res.json({name:'jiaqi'})`，这里因为我安装了json插件，所以数据样式被美化了一点。

![image-20211116145100502](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161451529.png)

还可以给客户端发送返回文件，`res.download('img.png')`，因为我这里真的有一张图片，客户端访问该网址的时候，就可以下载文件。

![动画](https://i.loli.net/2021/11/16/AhgOHMDE3xVJWjk.gif)

d. 如果想要给设置状态码，可以使用`res.sendStatus(500)`。

<img src="https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161448134.png" alt="image-20211116144817087" style="zoom:50%;" />

但如果设置状态码的同时，又想要发送内容可以使用`res.status(500).send('server error')`。

<img src="https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161449693.png" alt="image-20211116144917649" style="zoom:50%;" />

或者也可以使用 `res.status.json(message:'error')`，就会发送json格式的数据。

![image-20211116144644514](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161446563.png)



## 模板引擎

### 使用ejs渲染html

如果想要在客户端渲染html，我们可以使用 view engine，在这里将使用ejs这个npm包。

```bash
yarn add ejs #安装ejs
```

并在app.js设置ejs作为view engine。

```js
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  
});


app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
```

接着我们在根目录下创建一个view文件夹，用于存放需要被渲染的html文件夹。

![image-20211116151018624](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161510667.png)

接着将html后缀改为ejs

![image-20211116151103652](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161511685.png)

然后为了可以在ejs的文件有代码高亮和语法补全的功能，可以装一个ejs的插件。

![image-20211116151218913](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161512947.png)



接着在代码中增加一句，`app.render(view文件夹下的html名称)`，就会再客户端看到了hello了。

```js
app.get('/', (req, res) => {
  res.render('index');
});
```

![image-20211116151648927](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161516954.png)

### 给html传递信息

通过render函数的第二个参数，可以给我们的html文件传递信息

```js
app.get('/', (req, res) => {
  res.render('index',{name:'jiaqi'});
});
```

在ejs中 `<%%>`就相当于vue中的插槽`{{}}`，表示在这里使用js，`=` 表示在html中输出。

![image-20211116152211682](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161522716.png)

因此上面的截图最终在浏览器显示的是：

![image-20211116152704142](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161527164.png)

接下来，如果想要使用服务器给模板引擎传递的数据也是一样的。

![image-20211116153935849](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161539880.png)



![image-20211116153928351](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161539375.png)

但如果说我们给模板传了太多变量，到最后都不记得传没有传。比如这里我们并没有给模板引擎传name333这个变量，最后浏览器端就报错了。

![image-20211116154429299](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161544352.png)

为了这个问题，在ejs文件中我们在变量前面加一个locals。没有name333，那浏览器就不会显示，不会报错！

`![image-20211116154715656](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161547685.png)

![image-20211116154727153](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111161547173.png)

## 路由

如果说有百个路径，我们不能全部都写在app.js中，很难以维护，express当然也想到了这点。我们可以使用路由，路由就是让我们可以创建另外一个实例，它有自己的逻辑，然后最后我们可以把这些代码嵌入到我们的主代码。

比如在这里我写了很多与users有关的路径，我们可以将这些代码放入routes文件夹下。

```js
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index',{name:'jiaqi'});
});


app.get('/users', (req, res) => {
  res.send('user list');
})
app.get('/users/new', (req, res) => {
  res.send('user new form');
})
app.get('/users/logout', (req, res) => {
  res.send('user logout');
})


app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
```



