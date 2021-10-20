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

## Node和浏览器架构的区别

![image-20211020011325528](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110200113676.png)



### Node.js架构

我们编写的JavaScript代码会经过V8引擎，再通过Node.js的Bindings，将任务放到Libuv的事件循环中；

libuv（Unicorn Velociraptor—独角伶盗龙）是使用C语言编写的库；

libuv提供了事件循环、文件系统读写、网络IO、线程池等等内容； 

![image-20211020214049889](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110202140018.png)

### Node的REPL

REPL是Read-Eval-Print Loop的简称，翻译为“读取-求值-输出”循环；REPL是一个简单的、交互式的编程环境  

