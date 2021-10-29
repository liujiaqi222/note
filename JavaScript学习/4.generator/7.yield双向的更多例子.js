function* gen() {
    let ask1 = yield '2+2?=';
    console.log(ask1);
    let ask2 = yield '3*3?=';
    console.log(ask2);
}

const generator = gen();

// 获取第一个问题
console.log(generator.next());

// 1s后回答
setTimeout(() => {
    //回答是通过传参的形式来回答 只要我一传参下一个问题就会被执行
    console.log(generator.next(4)); //我回答了第一个问题，yield '3*3=?' 就被执行了
    

}, 1000);


setTimeout(() => {
    // 等第一个问题回答完了再回答
    // 这次我不想思考就直接回答
    console.log(generator.next(9)); //总共就2个yield，这里已经是第三次执行yield了因此
    // 会打印{ value: undefined, done: true }
}, 1000);

// 每个 next(value)（除了第一个）传递一个值到 generator 中，该值变成了当前 yield 的结果。
// 然后获取下一个 yield 的结果。