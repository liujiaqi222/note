// 目前来看 generator和可迭代对象类似，都是用来生成值的特殊语法。
// 但是generator更加强大和灵活

// 这是因为yield是一条双向路，它不仅可以向外返回结果，还可以将外部的值传递到generator内部

// 调用generator.next(arg)，就可以将arg传参到generator内部！ 这个arg就会变成yield的结果。


function* gen() {
    // 向外部传递一个问题并等待答案
    let result = yield '2+2?='; //(*)
    console.log(result);
}

let generator = gen();

console.log(generator.next().value); //2+2?=

generator.next(4);

// 1.第一次调用generator.next()是不带参数，即使带参数也会被忽略
// 接着停留在了*行
// 可以这样想这个generator函数要先给我提出问题，我才能回答
// 2.generator.next(4)，让*行恢复执行，并获得4作为结果，如果*后面还有yield，也会继续这个yield
// 这个过程可以看做回答函数提出的问题
// 当然这个回答过程可以很久,generator会等待我的回答,当然我也可以不回答,这就变成了单向过程

