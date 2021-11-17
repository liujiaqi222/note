// 1. 使用 Symbol.asyncIterator 取代 Symbol.iterator。
// 2.next() 方法应该返回一个 promise（带有下一个值，并且状态为 fulfilled）。
//  关键字 async 可以实现这一点，我们可以简单地使用 async next()。
// 3.我们应该使用 for await (let item of iterable) 循环来迭代这样的对象。
//  注意关键字 await。

let range = {
    from: 1,
    to: 5,
    [Symbol.asyncIterator]() { //(1)
        return {
            current: this.from,
            last: this.to,
            async next() { //(2)
                await new Promise(resolve => setTimeout(resolve, 1000)); //(3)
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ }
                } else {
                    return { done: true }
                }
            }
        }
    }
};



(async () => {
    for await (let i of range) { // (4)
        console.log(i);
    }
})()