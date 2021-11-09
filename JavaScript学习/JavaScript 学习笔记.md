# 元素拖动

## 知识点

**`DragEvent`** 是一个表示拖、放交互的一个[`DOM event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口。用户通过将指针设备（例如鼠标）放置在触摸表面上并且然后将指针拖动到新位置（诸如另一个DOM元素）来发起拖动。 应用程序可以按应用程序特定的方式自由解释拖放交互。

这个接口继承 [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) 和[`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)属性。



> tip:如果是手机端想要实现元素拖动，记得使用[touch事件](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)，手机端不支持drag事件。

```
drag 
```

拖动元素或选择文本时触发此事件。

```
dragend
```

当拖动操作结束时（释放鼠标按钮或按下退出键），会触发此事件。

```
dragenter
```

当拖动的元素或选择文本输入有效的放置目标时，会触发此事件。

```
dragleave 
```

当拖动的元素或文本选择离开有效的放置目标时，会触发此事件。

```
dragover
```

当将元素或文本选择拖动到有效放置目标（每几百毫秒）上时，会触发此事件。

```
dragstart 
```

当用户开始拖动元素或选择文本时触发此事件。

```
drop
```

当在有效放置目标上放置元素或选择文本时触发此事件。

------

`dragover`、`dragenter`、`dragleave`，和鼠标进入移出的事件对应。`dragstart`和`dragend`，顾名思义，就不做解释了。同样，`drag`和`drop`也很好理解，drag是拖动元素时触发，drop则是放下元素到有效位置时触发。

这其中`dragover`，`dragenter`，`dragover`，`drop`的 `e.target` 指向的是 **有效放置区域**，剩下的事件`e.target`指向的是被拖动的元素。

## 小项目

### 简单版

<iframe height="700" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/liujiaqi222/embed/jOLmxze?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/liujiaqi222/pen/jOLmxze">
  Untitled</a> by liujiaqi222 (<a href="https://codepen.io/liujiaqi222">@liujiaqi222</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
> Note: 要记得在dragOver事件监听中，加上preventDefault()否则会无法放置。

总结：

1. 这里把监听全部绑定到`document`上，可以大量节省内存占用,减少事件注册。
2. 注意区分监听事件的`e.target`指向的是什么。



### 中等难度

<iframe height="700" style="width: 100%;" scrolling="no" title="元素拖动" src="https://codepen.io/liujiaqi222/embed/jOLwmMR?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/liujiaqi222/pen/jOLwmMR">
  元素拖动</a> by liujiaqi222 (<a href="https://codepen.io/liujiaqi222">@liujiaqi222</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

值得注意的是，`dragover`这一事件监听是被添加在容器上的，因为如果添加在document上，`e.target`的指向可能会有容器和其他可拖动的元素。



# Generator学习笔记





# Canvas学习

## 什么是canvas？

HTML `<canvas>` 元素用于在网页上绘制图形。`<canvas>`元素只是图形的容器，我们必须使用 `JS` 实际绘制图形。

- Canvas 可以画出多彩文本，可以有也可以没有动画。
- Canvas 可以绘制图表。
- canvas can be animated. Canvas 对象可以移动。一切都是可能的：从简单的弹跳球到复杂的动画。
- canvas 可以是交互式的。Canvas可以响应任何用户操作（键单击，鼠标点击，按钮点击，手指移动）。



当没有设置宽度和高度的时候，canvas会初始化宽度为300像素和高度为150像素。该元素可以使用[CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS)来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。

>  如果你绘制出来的图像是扭曲的, 尝试用width和height属性为`<canvas>`明确规定宽高，而不是使用CSS。

`<canvas>`元素可以像任何一个普通的图像一样（有margin，border，background等等属性）被设计。然而，这些样式不会影响在canvas中的实际图像。`当开始时没有为canvas规定样式规则，其将会完全透明。`




<iframe height="500" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/liujiaqi222/embed/JjyLbyB?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/liujiaqi222/pen/JjyLbyB">
  Untitled</a> by liujiaqi222 (<a href="https://codepen.io/liujiaqi222">@liujiaqi222</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

1. 获取canvas元素

   ```js
   const canvas = document.getElementById('myCanvas');
   ```

2. 创建绘图对象

   ```js
   const ctx = canvas.getContext('2d');
   ```

3. 绘图

   先设置颜色为红色，`fillStyle` 属性可以是CSS颜色，渐变或 `pattern`。默认的fillStyle是黑色的。

   ```js
   ctx.fillStyle = '#f00';
   ```

   The fillRect(*x,y, width,height*) method draws a rectangle, filled with the fill style, on the canvas:

   ```js
   ctx.fillRect(0,0,150,75);
   ```

   

## 使用canvas来绘制图形

### 栅格

在我们开始画图之前，我们需要了解一下画布栅格（canvas grid）以及坐标空间。通常来说网格中的一个单元相当于canvas元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））

![img](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111070022363.png)



### 绘制矩形

不同于SVG，Canvas只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。不过，我们拥有众多路径生成的方法让复杂图形的绘制成为了可能。

canvas提供了三种方法绘制矩形：

- fillRect(x,y,width,height) 绘制一个填充的矩形
- strokeRect(x,y,width,height) 绘制一个矩形的边框
- clearRect(x,y,width,height) 清除指定矩形区域，让清除部分完全透明。

```html
<canvas id="canvas"></canvas>
<script>
  function draw(){
    const canvas = document.getElementById('canvas');
    if(canvas.getContext){
      const ctx = canvas.getContext('2d');
      ctx.fillRect(25,25,100,100);
      ctx.clearRect(45,45,60,60);
      ctx.strokeRect(50,50,50,50);
    }
  }
  draw();
</script>
```

![image-20211107003236080](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111070032112.png)

`fillRect()`函数绘制了一个边长为100px的黑色正方形。`clearRect()`函数从正方形的中心开始擦除了一个60乘以60px的正方形，接着 `strokeRect()`在清除区域内生成一个50乘以50的正方形边框。



### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。

1. 首先，你需要创建路径起始点。
2. 然后你使用[画图命令](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths)去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

以下是所要用到的函数：

- beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- closePath() 闭合路径之后图形绘制命令又重新指向到上下文中。
- stroke() 通过线条来绘制图形轮廓。
- fill() 通过填充路径的内容区域生成实心的图形。

生成路径的第一步叫做`beginPath()`。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。



> **注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。**

第二步就是调用函数指定绘制路径，本文稍后我们就能看到了。

第三，就是闭合路径closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

> **注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合**。



```js
<canvas id="canvas"></canvas>
<script>
function draw(){
  const canvas = document.getElementById('canvas');
  if(canvas.getContext){
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(100,75);
    ctx.lineTo(150,50);
    ctx.lineTo(150,100);
    ctx.fill();
  }
}
draw();
</script>
```

![image-20211107004313922](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111070043957.png)

#### 移动笔触

这个函数实际上并不能画出任何东西，也是上面所描述的路径列表的一部分，这个函数就是`moveTo()`。

`moveTo` 将笔触移动到指定的坐标x以及y上。

```js
<canvas id="canvas"></canvas>
<script>
  function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(150, 75, 50, 0, 2 * Math.PI);
      // 移动画笔
      ctx.moveTo(140, 60);
      ctx.arc(135, 60, 5, 0, Math.PI * 2);
      ctx.moveTo(170, 60);
      ctx.arc(165, 60, 5, 0, Math.PI * 2);
      ctx.moveTo(180, 75);
      ctx.arc(150, 75, 30, 0, Math.PI);
      ctx.stroke();
    }
  }
  draw();
</script>
```

![加上了moveto](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111070104914.png)

如果删掉了上面所有的`moveTo`，则会显示有很多连续的线，因此需要移动笔刷。

![image-20211107010542971](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111070105004.png)



#### 绘制直线

绘制直线，需要用到的方法`lineTo()`。

lineTo(x,y) 绘制一条从当前位置到指定x以及y位置的直线。

该方法有两个参数：x以及y ，代表坐标系中直线结束的点。开始点和之前的绘制路径有关，之前路径的结束点就是接下来的开始点，开始点也可以通过`moveTo()`函数改变。

```html
<canvas id="canvas"></canvas>
<script>
  function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');

      // 填充三角形
      ctx.beginPath();
      ctx.moveTo(25, 25);
      ctx.lineTo(75, 25);
      ctx.lineTo(25, 75);
      ctx.fill();

      // 描边三角形
      ctx.beginPath();
      ctx.moveTo(80, 30);
      ctx.lineTo(80, 80);
      ctx.lineTo(30, 80);
      ctx.lineTo(80, 30);
      ctx.stroke();
    }
  }
  draw();
</script>
```

![image-20211107154424458](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071544551.png)

#### 圆弧

绘制圆弧或者圆，我们使用`arc()`方法。当然可以使用`arcTo()`，不过这个的实现并不是那么的可靠，所以我们这里不作介绍。

`arc(x,y,radius,startAngle,endAngle,anticlockwise)` 

画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成,为true时，是逆时针方向，否则顺时针方向。

> **注意：`arc()`函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:**
>
> **弧度=(Math.PI/180)\*角度。**



```js
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          const x = 25 + j * 50; // x 坐标值
          const y = 25 + i * 50; // y 坐标值
          const radius = 20; // 圆弧半径
          const startAngle = 0;  // 开始点
          const endAngle = Math.PI + (Math.PI*j)/2;
          const anticlockwise = i%2==0?false:true; // 结束点
          ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise); // 顺时针或逆时针
          if(i>1){
            ctx.fill();
          }else{
            ctx.stroke();
          }
        }
      }
    }
  }
  draw();
```

x,y坐标是可变的。半径（radius）和开始角度（startAngle）都是固定的。结束角度（endAngle）在第一列开始时是180度（半圆）然后每列增加90度。最后一列形成一个完整的圆。

`clockwise`语句作用于第一、三行是顺时针的圆弧，`anticlockwise`作用于二、四行为逆时针圆弧。`if`语句让一、二行描边圆弧，下面两行填充路径。

![image-20211107160032208](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071600251.png)



### Path2D对象

正如我们在前面例子中看到的，你可以使用一系列的路径和绘画命令来把对象“画”在画布上。为了简化代码和提高性能，`Path2D`对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。

`Path2D()`会返回一个新初始化的Path2D对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量）。

```js
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```

所有的路径方法比如`moveTo`, `rect`, `arc`或`quadraticCurveTo`等，如我们前面见过的，都可以在Path2D中使用。

```js
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      const rectangle = new Path2D();
      rectangle.rect(10, 10, 50, 50);

      const circle = new Path2D();
      circle.moveTo(125, 35);
      circle.arc(100, 35, 35, 0, 2 * Math.PI);
      ctx.stroke(rectangle);
      ctx.fill(circle);
    }
  }
  draw();
</script>
```

![image-20211107162952342](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071629382.png)



## 使用样式和颜色

### 色彩

到目前为止，我们只看到过绘制内容的方法。如果我们想要给图形上色，有两个重要的属性可以做到：`fillStyle` 和 `strokeStyle`。

他们的值可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象。

>**注意:** 一旦设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置 `fillStyle` 或 `strokeStyle` 的值。

```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

#### fillStyle示例

在本示例里，将会再度用两层 `for` 循环来绘制方格阵列，每个方格不同的颜色。结果如右图，但实现所用的代码却没那么绚丽。我们使用两个变量 i 和 j 来为每一个方格产生唯一的 RGB 色彩值，其中仅修改红色和绿色通道的值，而保持蓝色通道的值不变。

```js
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          ctx.fillStyle = `rgba(${parseInt(42.5 * i)},${parseInt(42.5 * j)},255)`;
          ctx.fillRect(i * 50, j * 50, 50, 50);
        }
      }
    }
  }
  draw();
</script>
```

![image-20211107164445676](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071644749.png)

#### strokeStyle示例

这个示例与上面的有点类似，但这次用到的是 `strokeStyle` 属性，画的不是方格，而是用 `arc` 方法来画圆。

```js
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          ctx.strokeStyle = `rgba(0,${parseInt(42.5*i)},${parseInt(42.5*j)})`;
          ctx.beginPath();
          ctx.arc(50*(i+0.5),50*(j+0.5),25,0,Math.PI*2);
          ctx.stroke();
        }
      }
    }
  }
  draw();
</script>
```

![image-20211107165333941](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071653005.png)

### 透明度

除了可以绘制实色图形，我们还可以用 canvas 来绘制半透明的图形。通过设置 `globalAlpha` 属性或者使用一个半透明颜色作为轮廓或填充的样式。

`globalAlpha` 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为下面的方法可操作性更强一点。

因为 `strokeStyle` 和 `fillStyle` 属性接受符合 CSS 3 规范的颜色值，那我们可以用下面的写法来设置具有透明度的颜色。

```js
// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

#### globaAlpha 示例

在这个例子里，将用四色格作为背景，设置 `globalAlpha` 为 `0.2` 后，在上面画一系列半径递增的半透明圆。最终结果是一个径向渐变效果。圆叠加得越更多，原先所画的圆的透明度会越低。通过增加循环次数，画更多的圆，从中心到边缘部分，背景图会呈现逐渐消失的效果。

```html
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FD0';
      ctx.fillRect(0, 0, 150, 150);
      ctx.fillStyle = '#6c0';
      ctx.fillRect(150, 0, 150, 150);
      ctx.fillStyle = '#09F';
      ctx.fillRect(0, 150, 150, 150);
      ctx.fillStyle = '#F30';
      ctx.fillRect(150, 150, 150, 150);

      ctx.fillStyle ='#fff';
      ctx.globalAlpha = 0.2;
      for(let i = 0; i<15; i++){
        ctx.beginPath();
        ctx.arc(150,150,i*10,0,Math.PI*2);
        ctx.fill();
      }
    }
  }
  draw();
```



![image-20211107170949016](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071709083.png)

### 线型 Line styles（未看完）

可以通过一系列属性来设置线的样式。

- lineWidth，属性值必须为正数。默认值是1.0，用来设置线条宽度

- lineCap值为`butt`，`round` 和 `square`。默认是 `butt`。设置线条末端样式。

- lineJoin值为 设定线条与线条间接合处的样式。

- miterLimit  限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

  

- [ ] https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#a_strokestyle_example



## 绘制文本

canvas 提供了两种方法来渲染文本:

`fillText(text,x,y[,maxWidth]);`

在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的。

`strokeText(text,x,y[,maxWidth]);`

在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的。

```html
<canvas id="canvas" ></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font ='48px serif';
  ctx.fillText('Hello Canvas',10,50);
  ctx.strokeText('Hello Canvas',10,100);
</script>
```

![image-20211107172621343](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071726560.png)

### 文本样式

在上面的例子用我们已经使用了 `font` 来使文本比默认尺寸大一些. 还有更多的属性可以让你改变canvas显示文本的方式：

- font 当前我们用来绘制文本的样式. 这个字符串使用和 css font 属性相同的语法. 默认的字体是 `10px sans-serif`。
  - `font` 属性可以用来作为 [`font-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-style), [`font-variant`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant), [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight), [`font-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size), [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 和 [`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family) 属性的简写，或将元素的字体设置为系统字体。

- textAlign 文本对齐选项. 可选的值包括：`start`, `end`, `left`, `right` or `center`. 默认值是 `start`。
- textBaseline 基线对齐选项. 可选的值包括：`top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`。默认值是 `alphabetic`。
- direction 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。



### 预测量文本宽度

[`measureText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText)

将返回一个 [`TextMetrics`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics)对象的宽度、所在像素，这些体现文本特性的属性。

```html
<canvas id="canvas" ></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const text = ctx.measureText('foo');
  console.log(text);
</script>
```

![image-20211107173313382](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071733442.png)



## 绘制图片

canvas更有意思的一项特性就是图像操作能力。可以用于动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格式的外部图片都可以使用，比如PNG、GIF或者JPEG。 你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源。

引入图像到canvas里需要以下两步基本操作：

1. 获得一个指向[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片。
2. 使用`drawImage()`函数将图片绘制到画布上。

### 获取需要绘制的图片

我们可以通过下列方法的一种来获得与canvas相同页面内的图片的引用：

- [`document.images`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/images)集合
-  [`document.getElementsByTagName()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName)方法
- 如果你知道你想使用的指定图片的ID，你可以用[`document.getElementById()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)获得这个图片



### 绘制图片

#### 绘制图片

一旦获得了源图对象，我们就可以使用 `drawImage` 方法将它渲染到 canvas 里。`drawImage` 方法有三种形态，下面是最基础的一种。

`drawImage(image, x, y)` 其中 `image` 是 image 或者 canvas 对象，`x` 和 `y 是其在目标 canvas 里的起始坐标。`

```html
<canvas id="canvas" ></canvas>
<img src="https://mdn.mozillademos.org/files/5395/backdrop.png" alt="">
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
  // 等待图片加载完成
  img.onload = ()=>{
    ctx.drawImage(img,0,0);
    ctx.beginPath();
    ctx.moveTo(30,96);
    ctx.lineTo(70,66);
    ctx.lineTo(120,88);
    ctx.lineTo(160,38);
    ctx.stroke();
  }
</script>
```

![image-20211107181013334](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111071810396.png)



#### 缩放图片

`drawImage` 方法的又一变种是增加了两个用于控制图像在 canvas 中缩放的参数。

[`drawImage(image, x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

这个方法多了2个参数：`width` 和 `height，`这两个参数用来控制当向canvas画入时应该缩放的大小。

> 注意：图像可能会因为大幅度的缩放而变得起杂点或者模糊。如果您的图像里面有文字，那么最好还是不要进行缩放，因为那样处理之后很可能图像里的文字就会变得无法辨认了。



```js
<canvas id="canvas" ></canvas>
<img src="https://mdn.mozillademos.org/files/5397/rhino.jpg" alt="">
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
  // 等待image创建完成
  img.onload = ()=>{
    ctx.drawImage(img,0,0,40,40);
  }
</script>
```

![image-20211109161504633](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111091615184.png)

#### 图片裁切

`drawImage` 方法的第三个也是最后一个变种有8个新参数，可以用来裁切图片。

`drawImage(image,sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight)`

第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它8个参数可以参考下面的图片来理解，前4个是定义**图像源**的切片位置和大小，后4个则是定义切片的目标显示位置和大小。

![img](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111091620747.jpeg)



```js
<div>
  <img id="source" src="https://mdn.mozillademos.org/files/5397/rhino.jpg" width="300" height="227">
  <img id="frame" src="https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png" width="132" height="150">

</div>
<hr>
<canvas></canvas>
<script>
  const frame = document.getElementById('frame');
  const source = document.getElementById('source');

  const ctx = document.querySelector('canvas').getContext('2d');
  // slice
  ctx.drawImage(source, 33, 70, 100, 120, 86, 12, 100, 120)
  // frame
  ctx.drawImage(frame, 75, 0);
</script>
```

![image-20211109163632996](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111091636066.png)



### 绘制图片小案例

<iframe height="700" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/liujiaqi222/embed/NWvzqbZ?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/liujiaqi222/pen/NWvzqbZ">
  Untitled</a> by liujiaqi222 (<a href="https://codepen.io/liujiaqi222">@liujiaqi222</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>



### 控制图片的缩放行为

如同前文所述，过度缩放图像可能会导致图像模糊或像素化。您可以通过使用绘图环境的[`imageSmoothingEnabled`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)属性来控制是否在缩放图像时使用平滑算法。默认值为`true`，即启用平滑缩放。您也可以像这样禁用此功能：

```js
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```



## 变形

### 状态的恢复与保存

在了解变形之前，需要学习两个在开始绘制复杂图形时必不可少的方法。

[`save()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save)

保存画布(canvas)的所有状态

[`restore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/restore)

save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

Canvas状态存储在栈中，每当`save()`方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：

 

- 当前应用的变形
- 以及下面这些属性：[`strokeStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle), [`fillStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle), [`globalAlpha`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalAlpha), [`lineWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth), [`lineCap`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap), [`lineJoin`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin), [`miterLimit`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit), [`lineDashOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset), [`shadowOffsetX`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX), [`shadowOffsetY`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY), [`shadowBlur`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur), [`shadowColor`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor), [`globalCompositeOperation`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation), [`font`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font), [`textAlign`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign), [`textBaseline`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline), [`direction`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/direction), [`imageSmoothingEnabled`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)

- 当前的[裁切路径（clipping path）](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing#clipping_paths)

你可以调用任意多次 `save`方法。每一次调用 `restore` 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

#### save和restore的应用例子

第一步是用默认设置画一个大四方形，然后保存一下状态。改变填充颜色画第二个小一点的蓝色四方形，然后再保存一下状态。再次改变填充颜色绘制更小一点的半透明的白色四方形。

一旦我们调用 `restore`，**状态栈中最后的状态**会弹出，并恢复所有设置。

当第二次调用 `restore` 时，已经恢复到最初的状态，因此最后是再一次绘制出一个黑色的四方形。

```js
const ctx = document.getElementById('canvas').getContext('2d');
ctx.fillRect(0,0,150,150); //绘制一个矩形
ctx.save(); //保存此时的canvas样式配置

ctx.fillStyle = '#09F' ;
ctx.fillRect(15,15,120,120);

ctx.save(); //保存当前样式状态
ctx.fillStyle = '#fff';
ctx.globalAlpha = 0.5;
ctx.fillRect(30,30,90,90);

// 使用上一次的配置绘制一个矩形
ctx.restore();
ctx.fillRect(45,45,60,60);

ctx.restore(); //使用第一次的颜色配置
ctx.fillRect(60,60,30,30);
```



### 移动 translate

``translate `方法接受两个参数。x 是左右偏移量，y 是上下偏移量，如下图所示。



在做变形之前先保存状态是一个良好的习惯。大多数情况下，调用 restore 方法比手动恢复原先的状态要简单得多。又，如果你是在一个循环中做位移但没有保存和恢复 canvas 的状态，很可能到最后会发现怎么有些东西不见了，那是因为它很可能已经超出 canvas的画布 范围以外了。

![img](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111091802408.png)

#### translate的例子

如果不使用 `translate `方法，那么所有矩形都将被绘制在相同的位置（0,0）。`translate `方法同时让我们可以任意放置这些图案，而不需要在 `fillRect()` 方法中手工调整坐标值，既好理解也方便使用。









































# 零碎知识点

## 1.`mouseover`和`mouseenter`的区别？

`mouseover`：当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡过程。对应的移除事件是mouseout

`mouseenter`:当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是mouseleave

![img](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202110260947495.png)

**`mouseover`和`mouseenter`的异同体现在两个方面：**

1. 是否支持冒泡

   **由于`mouseenter`不支持事件冒泡，导致在一个元素的子元素上进入或离开的时候会触发其`mouseover`和`mouseout`事件，但不会触发`mouseenter`和`mouseleave`事件。**

2. 事件的触发时机

   **`mouseenter`**只有在当鼠标从元素的边界之外移入元素的边界之内时，事件被触发。而鼠标本身在元素边界内时，要触发该事件，必须先将鼠标移出元素边界外，再次移入才能触发。而mouseover只要在元素上移动，会被一直触发。



可见mouseover事件因其具有冒泡的性质，在子元素内移动的时候，频繁被触发，如果我们不希望如此，可以使用mouseenter事件代替之，

参考链接：https://juejin.cn/post/6844903480470028302



## 2.textContent与innerHTML的区别

- `textContent` 会获取*所有*元素的内容，包括 `<script>`和`<style>` 元素，然而 `innerText` 只展示给人看的元素。
- `textContent` 会返回节点中的每一个元素。受 CSS 样式的影响，`innerText`并不会返回隐藏元素(display:none)的文本

    - 此外，由于 `innerText` 受 CSS 样式的影响，它会触发回流（[reflow](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免。）

- 与 `textContent` 不同的是, 在 Internet Explorer (小于和等于 11 的版本) 中对 `innerText` 进行修改， 不仅会移除当前元素的子节点，而且还会*永久性地破坏*所有后代文本节点。在之后不可能再次将节点再次插入到任何其他元素或同一元素中。





# 小技巧

## 1.快速生成本地时间

```js
new Date().toLocaleString('zh-cn'); //2021/11/3 下午11:39:10

new Date().toLocaleString('zh-cn',{dateStyle:'long'}) //2021年11月3日

new Date().toLocaleString('zh-cn',{dateStyle:'long',timeStyle:'long'}) //2021年11月3日 GMT+8 下午11:47:53 用medium可以不显示 东八区

new Date().toLocaleString('zh-cn',{dateStyle:'full',timeStyle:'medium'}) // 2021年11月3日星期三 下午11:59:20 !!全场最佳!!

new Date().toLocaleString('zh-cn',{weekday:"long"}); //星期三 如果设置了weekday则将不能设置dateStyle和timeStyle

new Date().toLocaleString('zh-cn',{dateStyle:'long',timeStyle:'medium',hour12:false}); //2021/11/3 23:49:31


new Date().toLocaleDateString(); //2021/11/3

new Date().toLocaleTimeString() //下午11:39:10

new Date().toDateString() //Wed Nov 03 2021
```



## 2.数组小技巧

### 1.填充数组

```js
new Array(7); //生成含有7个空元素的数组 [ <7 empty items> ]

// 给数组中填充7个5
new Array(7).fill(5); //[5,5,5,5,5,5,5]
```



### 2.独一无二的数组

使用展开运算符和`Array.from()`会有同样的效果，因为集合是可迭代的。

```js
const arr = ['hello', 'world', 'word', 'word', 'excel', 'excel'];
const unique = Array.from(new Set(arr));  //[ 'hello', 'world', 'word', 'excel' ]
const unique2 = [...new Set(arr)]; //[ 'hello', 'world', 'word', 'excel' ]
```



### 3.快速切数组

如果我想要一个数组的前3位，当然我可以用`slice`方法。但还可以更简单！

```js
const nums = [1, 2, 3, 4, 5, 6];
nums.length = 3;
console.log(nums);  //[1,2,3]
```

但是这个方法的局限性太大了，所以还是得用`slice`。

```js
const numbers = [1, 2, 3, 4, 5, 6, 7];
console.log(numbers.slice(1,3)); //[ 2, 3 ]
console.log(numbers.slice(-1)); //[7] 
console.log(numbers.slice(-3)); //[ 4, 5, 6 ]
```



## 3.js代码时间测试

当然以下这两种办法只有在同步时，才是较为正确的结果

### 方法一

```js
let startAt = performance.now();

// 超级复杂的代码
for (let i = 0; i < 3333; i++){
    console.log(i);
}
//============
let endAt = performance.now();

console.log(endAt-startAt); //390ms
```

### 方法二

```js
console.time("用时");

// 超级复杂的代码
for (let i = 0; i < 3333; i++){
    console.log(i);
}
//================
console.timeEnd("用时"); //用时: 386.467ms  这就是最后控制台打印的结果
```



#### 4.获取页面上的所有图片

可以使用`document.images`获取页面上所有的img标签，返回一个类数组。

```html
<body>
	<img src='1.jpg'>
    <img src='2.jpg'>
    <script>
    	console.log(document.images);
    </script>
</body>
```

