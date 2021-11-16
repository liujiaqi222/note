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











# 二进制数据、文件

## ArrayBuffer 二进制数组

在 Web 开发中，当我们处理文件时（创建，上传，下载），经常会遇到二进制数据。另一个典型的应用场景是图像处理。

这些都可以通过 JavaScript 进行处理，而且二进制操作性能更高。

不过，在 JavaScript 中有很多种二进制数据格式，会有点容易混淆如`ArrayBuffer`，`Uint8Array`，`DataView`，`Blob`，`File`。



基本的二进制对象是 `ArrayBuffer` —— 对**固定长度**的**连续内存空间**的引用。

```js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
 console.log(buffer);
```

![image-20211109230142509](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111092301640.png)

它会分配一个 16 字节的连续内存空间，并用 0 进行预填充。

> `ArrayBuffer` **不是某种东西的数组**
>
> `ArrayBuffer` 与 `Array` 没有任何共同之处：
>
> - 它的长度是固定的，我们无法增加或减少它的长度。
> - 它正好占用了内存中的那么多空间。
> - 要访问单个字节，需要另一个“视图”对象，而不是 `buffer[index]`。



`ArrayBuffer` 是一个内存区域。它里面存储了什么？无从判断。只是一个原始的字节序列。

**如要操作 `ArrayBuffer`，我们需要使用“视图”对象。**视图对象本身并不存储任何东西。它是一副“眼镜”，透过它来解释存储在 `ArrayBuffer` 中的字节。

- **`Uint8Array`** —— 将 `ArrayBuffer` 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位，因此只能容纳那么多）。这称为 “8 位无符号整数”。
- **`Uint16Array`** —— 将每 2 个字节视为一个 0 到 65535 之间的整数。这称为 “16 位无符号整数”。
- **`Uint32Array`** —— 将每 4 个字节视为一个 0 到 4294967295 之间的整数。这称为 “32 位无符号整数”。
- **`Float64Array`** —— 将每 8 个字节视为一个 5.0 x 10<sup>-324</sup> 到 1.8x10<sup>308</sup> 之间的浮点数。

因此，一个 16 字节 `ArrayBuffer` 中的二进制数据可以解释为 16 个“小数字”，或 8 个更大的数字（每个数字 2 个字节），或 4 个更大的数字（每个数字 4 个字节），或 2 个高精度的浮点数（每个数字 8 个字节）。

![img](https://zh.javascript.info/article/arraybuffer-binary-arrays/arraybuffer-views.svg)

`ArrayBuffer` 是核心对象，是所有的基础，是原始的二进制数据。但是，如果我们要写入值或遍历它，基本上几乎所有操作 —— 我们必须使用视图（view），例如：

```js
//  创建一个长度为 16 的 buffer
const buffer = new ArrayBuffer(16);

// 将 buffer 视为一个 32 位整数的序列
const view = new Uint32Array(buffer);
console.log(view); // 一个类数组对象 其值为[0,0,0,0]
```

![image-20211109231046463](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111092310535.png)

```js
// 写入一个值
view[0] = 123456;
// 遍历值
for(let num of view){
  console.log(num);
} // 123456，然后 0，0，0（一共 4 个值）
```



### TypedArray

所有这些视图（`Uint8Array`，`Uint32Array` 等）的通用术语是 [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects)。它们都享有同一组方法和属性。

请注意，没有名为 `TypedArray` 的构造器，它只是表示 `ArrayBuffer` 上的视图之一的通用总称术语：`Int8Array`，`Uint8Array` 及其他，很快就会有完整列表。

当你看到 `new TypedArray` 之类的内容时，它表示 `new Int8Array`、`new Uint8Array` 及其他中之一。一个类型化数组的构造器（无论是 `Int8Array` 或 `Float64Array`，都无关紧要），其行为各不相同，并且取决于参数类型。

```js
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```

1. 如果给定的是 `ArrayBuffer` 参数，则会在其上创建视图。我们已经用过该语法了。

   可选，我们可以给定起始位置 `byteOffset`（默认为 0）以及 `length`（默认至 buffer 的末尾），这样视图将仅涵盖 `buffer` 的一部分。

2. 如果给定的是 `Array`，或任何类数组对象，则会创建一个相同长度的类型化数组，并复制其内容。 

   ```js
   const arr = new Uint8Array([0,1,2,3,5]);
   console.log(arr); //[0, 1, 2, 3, 5, buffer: ArrayBuffer(5), byteLength: 5, byteOffset: 0, length: 5]
   ```

3. 如果给定的是另一个 `TypedArray`，也是如此：创建一个相同长度的类型化数组，并复制其内容。如果需要的话，数据在此过程中会被转换为新的类型。

   ```js
   const arr16 = new Uint16Array([15,1000]);
   const arr8 = new Uint8Array(arr16);
   console.log(arr8[0]); //15
   console.log(arr8[1]); // 232，试图复制 1000，但无法将 1000 放进 8 位字节中
   ```

4. 对于数字参数 `length` —— 创建类型化数组以包含这么多元素。它的字节长度将是 `length` 乘以单个 `TypedArray.BYTES_PER_ELEMENT` 中的字节数：

   ```js
   // 参数为长度
   let array = new Uint16Array(4); //为 4 个整数创建类型化数组
   console.log(Uint16Array.BYTES_PER_ELEMENT); //每个整数 2 个字节
   console.log(array.byteLength); //8
   ```

   

5. 不带参数的情况下，创建长度为零的类型化数组。

   我们可以直接创建一个 `TypedArray`，而无需提及 `ArrayBuffer`。但是，视图离不开底层的 `ArrayBuffer`，因此，除第一种情况（已提供 `ArrayBuffer`）外，其他所有情况都会自动创建 `ArrayBuffer`。

	如要访问 `ArrayBuffer`，可以用以下属性：
	
	
	

- `arr.buffer` —— 引用 `ArrayBuffer`。

- `arr.byteLength` —— `ArrayBuffer` 的长度。

  因此，我们总是可以从一个视图转到另一个视图:

  ```js
  const array8 = new Uint8Array([0,5,2,3]);
  // 同一数据的另一视图
  const array16 = new Uint16Array(array8.buffer);
  console.log(array8,array16);
  ```

  下面是类型化数组的列表：

- `Uint8Array` ，`Uint16Array`，`Uint32Array` —— 用于 8、16 和 32 位的整数。

- `Uint8ClampedArray` —— 用于 8 位整数，在赋值时便“固定“其值（见下文）。

- `Int8Array`，`Int16Array`，`Int32Array` —— 用于有符号整数（可以为负数）。

- `Float32Array`，`Float64Array` —— 用于 32 位和 64 位的有符号浮点数。

### 越界行为

如果我们尝试将越界值写入类型化数组会出现什么情况？不会报错。但是多余的位被切除。

例如，我们尝试将 256 放入 `Uint8Array`。256 的二进制格式是 `100000000`（9 位），但 `Uint8Array` 每个值只有 8 位，因此可用范围为 0 到 255。

对于更大的数字，仅存储最右边的（低位有效）8 位，其余部分被切除：

![image-20211110091228246](C:\Users\singhand\AppData\Roaming\Typora\typora-user-images\image-20211110091228246.png)

因此结果是 0。

257 的二进制格式是 `100000001`（9 位），最右边的 8 位会被存储，因此数组中会有 `1`：

![image-20211110091257833](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111100912880.png)



换句话说，该数字对 2<sup>8</sup> 取模的结果被保存了下来。

```js
const unit8array = new Uint8Array(4); //为4个整数创建类型化数组
let num  = 256;
console.log(num.toString(2)); //// 100000000（二进制表示）
unit8array[0] =256;
unit8array[1]=257;
console.log(unit8array); //[0, 1, 0, 0, buffer: ArrayBuffer(4), byteLength: 4, byteOffset: 0, length: 4]
```

`Uint8ClampedArray` 在这方面比较特殊，它的表现不太一样。对于大于 255 的任何数字，它将保存为 255，对于任何负数，它将保存为 0。此行为对于图像处理很有用。



### TypedArray方法

`TypedArray` 具有常规的 `Array` 方法，但有个明显的例外。我们可以遍历（iterate），`map`，`slice`，`find` 和 `reduce` 等。

但有几件事我们做不了：

- 没有 `splice` —— 我们无法“删除”一个值，因为类型化数组是缓冲区（buffer）上的视图，并且缓冲区（buffer）是固定的、连续的内存区域。我们所能做的就是分配一个零值。
- 无 `concat` 方法。

还有两种其他方法：

- `arr.set(fromArr, [offset])` 从 `offset`（默认为 0）开始，将 `fromArr` 中的所有元素复制到 `arr`。
- `arr.subarray([begin, end])` 创建一个从 `begin` 到 `end`（不包括）相同类型的新视图。这类似于 `slice` 方法（同样也支持），但不复制任何内容 —— 只是创建一个新视图，以对给定片段的数据进行操作。

有了这些方法，我们可以复制、混合类型化数组，从现有数组创建新数组等。



### DataView

[DataView](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/DataView) 是在 `ArrayBuffer` 上的一种特殊的超灵活“未类型化”视图。它允许以任何格式访问任何偏移量（offset）的数据。

- 对于类型化的数组，构造器决定了其格式。整个数组应该是统一的。第 i 个数字是 `arr[i]`。
- 通过 `DataView`，我们可以使用 `.getUint8(i)` 或 `.getUint16(i)` 之类的方法访问数据。我们在调用方法时选择格式，而不是在构造的时候。



语法：

```js
new DataView(buffer, [byteOffset], [byteLength])
```

- **`buffer`** —— 底层的 `ArrayBuffer`。与类型化数组不同，`DataView` 不会自行创建缓冲区（buffer）。我们需要事先准备好。
- **`byteOffset`** —— 视图的起始字节位置（默认为 0）。
- **`byteLength`** —— 视图的字节长度（默认至 `buffer` 的末尾）。

```js
const buffer = new Uint8Array([255,255,255,255]).buffer;
const dataView = new DataView(buffer);
// 在偏移量为 0 处获取 8 位数字
console.log(dataView.getUint8(0)); //255
console.log(dataView.getUint16(0)); //65535
console.log(dataView.getUint32(0)); //4294967295
dataView.setUint32(0,0) // 将 4 个字节的数字设为 0，即将所有字节都设为 0
```



### 总结

`ArrayBuffer` 是核心对象，是对固定长度的连续内存区域的引用。几乎任何对 `ArrayBuffer` 的操作，都需要一个视图。

 

- 它可以是`TypedArray`:
  - `Uint8Array`，`Uint16Array`，`Uint32Array` —— 用于 8 位、16 位和 32 位无符号整数。
  - `Uint8ClampedArray` —— 用于 8 位整数，在赋值时便“固定”其值。
  - `Int8Array`，`Int16Array`，`Int32Array` —— 用于有符号整数（可以为负数）。
  - `Float32Array`，`Float64Array` —— 用于 32 位和 64 位的有符号浮点数。
- 或 `DataView` —— 使用方法来指定格式的视图，例如，`getUint8(offset)`。



在大多数情况下，我们直接对类型化数组进行创建和操作，而将 `ArrayBuffer` 作为“通用标识符（common discriminator）”隐藏起来。我们可以通过 `.buffer` 来访问它，并在需要时创建另一个视图。

还有另外两个术语，用于对二进制数据进行操作的方法的描述：

- `ArrayBufferView` 是所有这些视图的总称。
- `BufferSource` 是 `ArrayBuffer` 或 `ArrayBufferView` 的总称

![img](https://zh.javascript.info/article/arraybuffer-binary-arrays/arraybuffer-view-buffersource.svg)





### Blob

`ArrayBuffer` 和视图（view）都是 ECMA 标准的一部分，是 JavaScript 的一部分。

在浏览器中，还有其他更高级的对象，特别是 `Blob`，在 [File API](https://www.w3.org/TR/FileAPI/) 中有相关描述。

`Blob` 由一个可选的字符串 `type`（通常是 MIME 类型）和 `blobParts` 组成 —— 一系列其他 `Blob` 对象，字符串和 `BufferSource`。

`Blob` 对象表示一个**不可变、原始数据的类文件对象**。它的数据可以按文本或二进制的格式进行读取，也可以转换成 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 来用于数据操作。 



![img](https://zh.javascript.info/article/blob/blob.svg)

构造函数的语法为：

```javascript
new Blob(blobParts, options);
```

- **`blobParts`** 是 `Blob`/`BufferSource`/`String` 类型的值的数组。
- `options`可选对象：
  - **`type`** —— `Blob` 类型，通常是 MIME 类型，例如 `image/png`，
  - **`endings`** —— 是否转换换行符，使 `Blob` 对应于当前操作系统的换行符（`\r\n` 或 `\n`）。默认为 `"transparent"`（啥也不做），不过也可以是 `"native"`（转换）。



```js
// 从字符串创建 Blob
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// 请注意：第一个参数必须是一个数组 [...]
```

```js
// 从类型化数组（typed array）和字符串创建 Blob
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```

我们可以用 `slice` 方法来提取 `Blob` 片段：

```javascript
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** —— 起始字节，默认为 0。
- **`byteEnd`** —— 最后一个字节（专有，默认为最后）。
- **`contentType`** —— 新 blob 的 `type`，默认与源 blob 相同。

> 我们无法直接在 `Blob` 中更改数据，但我们可以通过 `slice` 获得 `Blob` 的多个部分，从这些部分创建新的 `Blob` 对象，将它们组成新的 `Blob`，等。
>
> 这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以生成一个新的改动过的字符串。

### Blob 用作URL

Blob 可以很容易用作 `<a>`、`<img>` 或其他标签的 URL，来显示它们的内容。

多亏了 `type`，让我们也可以下载/上传 `Blob` 对象，而在网络请求中，`type` 自然地变成了 `Content-Type`。

让我们从一个简单的例子开始。通过点击链接，你可以下载一个具有动态生成的内容为 `hello world` 的 `Blob` 的文件：

```js
<!-- download 特性（attribute）强制浏览器下载而不是导航 -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```



![实际效果](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111101129414.gif)



说实话，我真的大为震惊，我都没有提前准备hello.txt，通过blob就直接被下载了，下载的内容还是和blobparts中内容一样！

我们也可以在 Javascript 中动态创建一个链接，通过 `link.click()` 模拟一个点击，然后便自动下载了。

下面是类似的代码，此代码可以让用户无需任何 HTML 即可下载动态生成的 `Blob`（译注：也就是通过代码模拟用户点击，从而自动下载）：

```js
let link = document.createElement('a');
link.download = 'hello.md';
let blob = new Blob(['hello,world'],{type:'type/plain'});
// 然后把这个blob生成链接
link.href=URL.createObjectURL(blob);
console.log(link.href);
link.click();
```



![实际演示](https://gitee.com/zyxbj/image-warehouse/raw/master/pics/202111101144252.gif)



`URL.createObjectURL` 取一个 `Blob`，并为其创建一个唯一的 URL，形式为 `blob:<origin>/<uuid>`。

也就是 `link.href` 的值的样子：

```none
blob:http://127.0.0.1:5500/1f6ea749-8b03-4b5a-9bf1-af08fde81aae
```

浏览器内部为每个通过 `URL.createObjectURL` 生成的 URL 存储了一个 URL → `Blob` 映射。因此，此类 URL 很短，但可以访问 `Blob`。

生成的 URL（即其链接）仅在当前文档打开的状态下才有效。它允许引用 `<img>`、`<a>` 中的 `Blob`，以及基本上任何其他期望 URL 的对象。

不过它有个副作用。虽然这里有 `Blob` 的映射，但 `Blob` 本身只保存在内存中的。浏览器无法释放它。

**因此，如果我们创建一个 URL，那么即使我们不再需要该 `Blob` 了，它也会被挂在内存中。**



`URL.revokeObjectURL(url)` 从内部映射中移除引用，因此允许 `Blob` 被删除（如果没有其他引用的话），并释放内存。当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。

在上面最后一个示例中，我们打算仅使用一次 `Blob`，来进行即时下载，因此我们立即调用 `URL.revokeObjectURL(link.href)`。

而在前一个带有可点击的 HTML 链接的示例中，我们不调用 `URL.revokeObjectURL(link.href)`，因为那样会使 `Blob` URL 无效。在调用该方法后，由于映射被删除了，因此该 URL 也就不再起作用了。



### Blob转换为base64

`URL.createObjectURL` 的一个替代方法是，将 `Blob` 转换为 base64-编码的字符串。



























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

