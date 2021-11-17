function* gen() {
    let result = yield '2+2?='
    console.log(result); 
}

// 执行函数得到generator对象
const generator = gen();

// 第一步不能传参，我要获取问题，再把答案给他
console.log(generator.next().value);

// 这个问题有点难 我需要思考四秒钟
setTimeout(() => {
    generator.next(4); //啊哈，想了出来，把4传递回generator
}, 4000);