# 引入

## 浏览器

### 浏览器内核

我们经常会说：不同的浏览器有不同的内核组成

- Gecko：早期被Netscape和Mozilla Firefox浏览器使用；
-  Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink；
- Webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用；
- Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等；

我们经常说的浏览器内核指的是浏览器的排版引擎：
排版引擎（layout engine），也称为浏览器引擎（browser engine）、页面渲染引擎（rendering engine）或样版引擎。

#### 渲染引擎工作的过程

a. 在这个执行过程中，HTML解析的时候遇到了JavaScript标签，应该怎么办呢？

渲染引擎便会停止解析HTML，而JavaScript引擎去加载和执行JavaScript代码。

b. 为什么不直接异步去加载执行JavaScript代码，而要在这里停止掉呢？

这是因为JavaScript代码可以操作我们的DOM；所以浏览器希望将HTML解析的DOM和JavaScript操作之后的DOM放到一起来生成最终的DOM树，而不是频繁的去生成新的DOM树。

c. 那么，JavaScript代码由谁来执行呢？

由JavaScript引擎。

![image-20211020002926025](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110200029139.png)

### JavaScript引擎

a. 为什么需要JavaScript引擎呢？

事实上我们编写的JavaScript无论你交给浏览器或者Node执行，最后都是需要被CPU执行的；但是CPU只认识自己的**指令集**，实际上是机器语言，才能被CPU所执行；**所以我们需要JavaScript引擎帮助我们将JavaScript代码翻译成CPU指令来执行**；  

b. 比较常见的JavaScript引擎有哪些呢？

- SpiderMonkey：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）；
- Chakra：微软开发，用于IT浏览器；
- JavaScriptCore：WebKit中的JavaScript引擎，Apple公司开发；
- V8：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出；  



总之，浏览器由`内核和JS引擎`两部分组成。以WebKit为例：

- WebCore：负责HTML解析、布局、渲染等等相关的工作；
- JavaScriptCore：解析、执行JavaScript代码；  

![image-20211020003853345](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110200038409.png)

### V8引擎

V8是用C++编写的Google开源高性能JavaScript和WebAssembly引擎，它用于Chrome和Node.js等。

- 它实现ECMAScript和WebAssembly，并在Windows7或更高版本，macOS 10.12+ 和使用x64，IA-32，ARM 或 MIPS 处理器的Linux系统上运行。

- V8可以独立运行，也可以嵌入到任何C++应用程序中。  

![image-20211020004418807](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110200044912.png)

### V8引擎

V8引擎本身的源码非常复杂，大概有超过100w行C++代码，但是我们可以简单了解一下它执行JavaScript代码的原理：

- Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；

  - 如果函数没有被调用，那么是不会被转换成AST的；
  - Parse的V8官方文档：https://v8.dev/blog/scanner
- Ignition是一个解释器，会将AST转换成ByteCode（字节码）
    - 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；
    - 如果函数只调用一次，Ignition会执行解释执行ByteCode；
    - Ignition的V8官方文档：https://v8.dev/blog/ignition-interpreter
- TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；
  - 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，提高代码的执行性能；
  -  但是，机器码实际上也会被还原为ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化（比如sum函数原来执行的是number类型，后来执行变成了string类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；
  - TurboFan的V8官方文档：https://v8.dev/blog/turbofan-jit
- 上面是JavaScript代码的执行过程，事实上V8的内存回收也是其强大的另外一个原因，不过这里暂时先不展开讨论：
  - Orinoco模块，负责垃圾回收，将程序中不需要的内存回收；
  - Orinoco的V8官方文档：https://v8.dev/blog/trash-talk  

## Node

Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。  

也就是说Node.js基于V8引擎来执行JavaScript的代码，但是不仅仅只有V8引擎：

- 前面我们知道V8可以嵌入到任何C++应用程序中，无论是Chrome还是Node.js，事实上都是嵌入了V8引擎来执行JavaScript代码；

- 但是在Chrome浏览器中，还需要解析、渲染HTML、CSS等相关渲染引擎，另外还需要提供支持浏览器操作的API、浏览器自己的事件循环等；

- 另外，在Node.js中我们也需要进行一些额外的操作，比如文件系统读/写、网络IO、加密、压缩解压文件等操作；  

Node和浏览器架构的区别

![image-20211020011325528](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110200113676.png)



### Node.js架构

我们编写的JavaScript代码会经过V8引擎，再通过Node.js的Bindings，将任务放到Libuv的事件循环中；

libuv（Unicorn Velociraptor—独角伶盗龙）是使用C语言编写的库；

libuv提供了事件循环、文件系统读写、网络IO、线程池等等内容； 

![image-20211020214049889](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110202140018.png)

### Node的REPL

REPL是Read-Eval-Print Loop的简称，翻译为“读取-求值-输出”循环；REPL是一个简单的、交互式的编程环境。  

在命令行中输入node，即可进入repl环境。

![image-20211022230301476](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110222303573.png)



### Node程序传递参数

正常情况下执行一个node程序，直接跟上我们对应的文件即可：  

```bash
node index.js
```

但是，在某些情况下执行node程序的过程中，我们可能希望给node传递一些参数：  

```bash
node index.js env=development jiaqicoder
```

如果我们这样来使用程序，就意味着我们需要在程序中获取到传递的参数:

- 获取参数其实是在process的内置对象中的；

- 如果我们直接打印这个内置对象，它里面包含特别的信息，如node的版本，操作系统等。

  ```js
  console.log(process);
  ```

  

![image-20211022230846442](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110222308518.png)

![image-20211022231040959](C:\Users\liujiaqi\AppData\Roaming\Typora\typora-user-images\image-20211022231040959.png)

如果想要拿到传递的参数，可以直接通过`process.argv`来获取。

![image-20211022231902688](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110222319736.png)

> 为什么叫做argv？

在C/C++程序中的main函数中，实际上可以获取到两个参数：

- argc：argument counter的缩写，传递参数的个数；
- argv：argument vector的缩写，传入的具体参数。
- vector翻译过来是矢量的意思，在程序中表示的是一种数据结构。
- 在C++、Java中都有这种数据结构，是一种数组结构；
- 在JavaScript中也是一个数组，里面存储一些参数信息；  

### Node的输出

`console.log()`

最常用的输入内容的方式：console.log
`console.clear()`
清空控制台：console.clear
`console.trace()`
打印函数的调用栈：console.trace  



![image-20211022233150540](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110222335432.png)

### 常见的全局对象

Node中给我们提供了一些全局对象，方便我们进行一些操作：

https://nodejs.org/dist/latest-v17.x/docs/api/globals.html

![image-20211023000034652](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110230000795.png)

- process对象：process提供了Node进程中相关的信息：

	比如Node的运行环境、参数信息等；

- console对象：提供了简单的调试控制台 https://nodejs.org/dist/latest-v17.x/docs/api/console.html。

- 定时器函数：在Node中使用定时器有好几种方式：
  `setTimeout(callback, delay[, ...args])`：callback在delay毫秒后执行一次；

  `setInterval(callback, delay[, ...args])`：callback每delay毫秒重复执行一次；
  `setImmediate(callback[, ...args])`：callbackI / O事件后的回调的“立即”执行；

> **特殊的全局对象** 

这些全局对象可以在模块中任意使用，但是在命令行交互中是不可以使用的；包括：__dirname、__filename、exports、module、require()。

`__dirname`：获取当前文件所在的路径，不包括后面的文件名。

`__filename`：获取当前文件所在的路径和文件名称，包括后面的文件名称。 

### global对象

global是一个全局对象，事实上前面的process、console、setTimeout等都有被放到global中：  

在node的repl中输入`global.`，再按两次`tab`键即可显示global对象中所有的属性。

![image-20211023145054263](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110231451599.png)

# 模块化

## 什么是模块化

模块化开发最终的目的是将程序划分成**一个个小的模块**；这个结构中编写属于**自己的逻辑代码**，**有自己的作用域**，不会影响到其他的结构；这个结构可以将自己希望暴露的变量、函数、对象等导出给其结构使用；也可以通过某种方式，导入另外结构中的变量、函数、对象等；  

### 早期的Javascript

在网页开发的早期，Brendan Eich开发JavaScript仅仅作为一种`脚本语言`，做一些简单的表单验证或动画实现等，那个时候代码还是很少的：这个时候我们只需要将JavaScript代码写到`<script>`标签中即可，并没有必要放到多个文件中来编写；甚至流行：通常来说 JavaScript 程序的长度只有一行。

但是随着前端和JavaScript的快速发展，JavaScript代码变得越来越复杂了：

- ajax的出现，`前后端开发分离`，意味着后端返回数据后，我们需要通过JavaScript进行前端页面的渲染；
- SPA的出现，前端页面变得更加复杂：包括`前端路由、状态管理`等等一系列复杂的需求需要通过JavaScript来实现；
- 包括Node的实现，JavaScript编写复杂的后端程序，没有模块化是致命的硬伤；

所以，模块化已经是JavaScript一个非常迫切的需求：

- 但是JavaScript本身，直到ES6（2015）才推出了自己的模块化方案；
- 在此之前，为了让JavaScript支持模块化，涌现出了很多不同的模块化规范：AMD、CMD、CommonJS等；

### 没有模块化带来的问题

早期没有模块化带来了很多的问题：比如命名冲突的问题。

当然，我们有办法可以解决上面的问题：立即函数调用表达式（IIFE） (Immediately Invoked Function Expression)

但是，我们其实带来了新的问题：

1. 必须记得每一个模块中返回对象的命名，才能在其他模块使用过程中正确的使用。

2. 代码写起来混乱不堪，每个文件中的代码都需要包裹在一个匿名函数中来编写；

3. 在没有合适的规范情况下，每个人、每个公司都可能会任意命名、甚至出现模块名称相同的情况；

所以，我们会发现，虽然实现了模块化，但是我们的实现过于简单，并且是没有规范的。

我们需要制定一定的规范来约束每个人都按照这个规范去编写模块化的代码；

这个规范中应该包括核心功能：**模块本身可以导出暴露的属性，模块又可以导入自己需要的属性**。JavaScript社区为了解决上面的问题，涌现出一系列好用的规范，如amd，cmd。



## CommonJs和Node

我们需要知道CommonJS是一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为ServerJS，后来为了体现它的广泛性，修改为CommonJS，平时我们也会简称为CJS。
- Node是CommonJS在服务器端一个具有代表性的实现；

- Browserify是CommonJS在浏览器中的一种实现；

- webpack打包工具具备对CommonJS的支持和转换；

所以，Node中对CommonJS进行了支持和实现，让我们在开发node的过程中可以方便的进行模块化开发：

- **在Node中每一个js文件都是一个单独的模块**；
- 这个模块中包括CommonJS规范的核心变量：exports、module.exports、require；

前面我们提到过模块化的核心是导出和导入，Node中对其进行了实现：

- exports和module.exports可以负责对模块中的内容进行导出；

- require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；  

## exports 导出

exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性可以被导出。

```js
//bar.js
const name = 'jiaqicoder';
const age = 20;

exports.myName = name;
exports.age = age;
```

另外一个文件中可以导入`bar.js`中导出的变量：

```js

const bar = require('./bar');
//本质上相当于 const bar = exports，bar是对bar.js中的exports对象的浅拷贝。

console.log(bar);
// {myName:'jiaqicoder',age:20}
```

- 意味着main中的bar变量等于exports对象；

- 也就是require通过各种查找方式，最终找到了exports这个对象；

- 并且将这个exports对象赋值给了bar变量；

- bar变量就是exports对象了；  



> Node中实现CommonJs规范的本质就是对象的引用赋值。



![image-20211023163925850](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110231639934.png)

```js
//bar.js
const name = 'jiaqicoder';

setTimeout(() => {
    exports.myName = 'jiaqi';
}, 1000);

exports.myName = name;


//main.js
const bar = require('./bar.js'); 
// 本质是 bar = exports，变量bar是对bar.js文件中exports对象的浅拷贝

console.log(bar.myName); // jiaqicoder

setTimeout(() => {
    // 打印jiaqi
    console.log(bar.myName); 
    // exports中的myName修改后，此时打印的myName也将被修改
}, 1500);

```

## module.exports  

Node中我们经常导出变量的时候，通常是通过module.exports导出的：  

CommonJS中是没有module.exports的概念的；但是为了实现模块的导出，Node中使用的是Module的类，每一个模块都是Module的一个实例，也就是module；

所以在Node中真正用于导出的其实根本不是exports，而是module.exports；因为module才是导出的真正实现者；

但是，为什么exports也可以导出呢？

这是因为module对象的exports属性是exports对象的一个引用；也就是说 `module.exports = exports = main`中的`bar`；  

```js
//main.js
const bar = require('./bar.js'); 
// 本质是 bar = exports，变量bar是对bar.js文件中exports对象的浅拷贝

console.log(bar.name,2); //jiaqicoder

bar.name ='jiaqi';

//bar.js
const name = 'jiaqicoder';

module.exports.name = name; 
console.log(module.exports.name,1); //jiaqicoder

setTimeout(() => {
    console.log(exports.name,3); //jiaqi
}, 1000);
```

