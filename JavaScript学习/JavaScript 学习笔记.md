# 元素拖动

## 知识点

**`DragEvent`** 是一个表示拖、放交互的一个[`DOM event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口。用户通过将指针设备（例如鼠标）放置在触摸表面上并且然后将指针拖动到新位置（诸如另一个DOM元素）来发起拖动。 应用程序可以按应用程序特定的方式自由解释拖放交互。

这个接口继承 [`MouseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent) 和[`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)属性。



> tip:如果是手机端想要实现元素拖动，记得使用[touch事件](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)，手机端不支持drag事件。





## 小项目





# 零碎知识点

1.`mouseover`和`mouseenter`的区别？

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