// Iterable 如上所述，是实现了 Symbol.iterator 方法的对象。
// Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组。

// 可迭代对象和类数组对象通常都 不是数组，它们没有 push 和 pop 等方法。
// 如果我们有一个这样的对象，并想像数组那样操作它，那就非常不方便。例如，我们想使用数组方法操作 range，应该如何实现呢？

// 有一个全局方法 Array.from 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组。然后我们就可以对其调用数组方法了。

const arrayLike = {
    0: 'hello',
    1: 'world',
    length:2,
}

let arr = Array.from(arrayLike)
console.log(arr);['hello', 'world']

// Array.from 的完整语法允许我们提供一个可选的“映射（mapping）”函数：

// Array.from(obj[, mapFn, thisArg])
// 可选的第二个参数 mapFn 可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外 thisArg 允许我们为该函数设置 this。
