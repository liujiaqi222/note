for (let char of '𝒳😂') {
    console.log(char);
}

// 为了更深层地了解底层知识，让我们来看看如何显式地使用迭代器。
// 我们将会采用与 for..of 完全相同的方式遍历字符串，但使用的是直接调用。
// 这段代码创建了一个字符串迭代器，并“手动”从中获取值。

let str = 'hello';

let iterator = str[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) {
        break
    }
    console.log(result.value);
}