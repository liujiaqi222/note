function* generatorSequence() {
    yield 1;
    yield 2;
    return 3;
}


// 得到generator对象
const generator = generatorSequence();

// 对其进行迭代
for (let i of generator) {
    console.log(i); //1 2
}

// 注意到它并没有打印3
// 因为到3时，done为true，将会被忽略，for of 只会打印done为false的value

// 同时由于generator是可迭代的，因此可以使用展开语法

console.log([...generator]); //此时只会打印空数组，因为上面的for of已经将它迭代完了

