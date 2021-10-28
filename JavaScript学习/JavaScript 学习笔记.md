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

