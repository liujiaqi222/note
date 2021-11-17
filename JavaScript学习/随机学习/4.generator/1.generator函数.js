// 创建generator函数
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

// 函数调用后不会运行其代码，而是返回一个generator object
const generator = generateSequence();

// 一个generator对象最主要方法是next()
console.log(generator); //Object [Generator] {}

console.log(generator.next()); //{ value: 1, done: false }
console.log(generator.next()); //{ value: 2, done: false }
console.log(generator.next()); //{ value: 3, done: true }

//现在 generator 执行完成

// 再对 generator.next() 进行新的调用不再有任何意义。
console.log(generator.next()); //{ value: undefined, done: true }