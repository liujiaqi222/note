// 正如我们在上面的例子中观察到的那样，外部代码可能会将一个值传递到 generator，作为 yield 的结果。

// ……但是它也可以在那里发起（抛出）一个 error。这很自然，因为 error 本身也是一种结果。

// 要向 yield 传递一个 error，我们应该调用 generator.throw(err)。
// 在这种情况下，err 将被抛到对应的 yield 所在的那一行。

function* gen() {
    try {
        let result = yield '2+2=?';
        console.log('"The execution does not reach here, because the exception is thrown above"');
    } catch (e) {
        console.log(e); //显示错误
    }
}


const generator = gen();

console.log(generator.next());
// 要是你说还没执行这个，获取值就throw err 则上面的try catch是无法捕获的！
// 不过我觉得如果这样做的话，确实简直有病，因为都还不知道yield返回的结果是什么呢！
// 如果说有人一定要这么做的话，则可以看看文件9中的例子 直接在调用处捕获

generator.throw('md这个问题太难了我回答不了')


// 值得注意的是 let result = yield '2+2=?';的下一行代码并没有执行