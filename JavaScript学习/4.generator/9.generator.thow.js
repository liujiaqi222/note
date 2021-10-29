function* generate() {
    let result = yield '1+1=?';
    console.log('gosh,我不会被执行哎');
}

// 如果我们没有捕获它，那么就会像其他的异常一样，它将从 generator “掉出”到调用代码中。

const generator = generate();

try {
    generator.next();
    generator.throw('哈，给你throw一个错')
} catch(err) {
    console.log(err);
}