// 回想可迭代对象 iterable object
let range = {
    from: 1,
    to: 5,
    // for ... of 迭代一开始就会寻找这一个方法
    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to,
            // 接着会调用Symbol.iterator中的next方法
            next() {
                if (this.current <= this.last) {
                    // 如果小于最终的值则返回对应的值和done为false
                    return {done:false,value:this.current++}
                } else {
                    return {done:true}
                }
            }
        }
    }
}
// 此时便可以开始迭代range了
for (let i of range) {
    console.log(i);
}
// 或者说使用展开语法来迭代
console.log([...range]);  //[ 1, 2, 3, 4, 5 ]

console.log('===========================');

// ===========================
// 利用到刚刚学的generator函数，我们可以提供一个generator函数作为Symbol.iterator
let rangeG = {
    from: 1,
    to: 5,
    // 声明一个Symbol.iterator函数
    *[Symbol.iterator]() {
        // 接着yield每一个值
        for (let value = this.from; value <= this.to; value++){
            yield value;
        }
    }
}

// 进行上方的操作后，rangeG对象也会变成可迭代的

for (let i of rangeG) {
    console.log(i,'genrator');
}

// 我知道你肯定会想 GEE，这都能行？

// 这是因为range[Symbol.iterator]() 会返回一个 generator对象
// 而这个对象1.刚好有next方法2.它的值返回形式是{value:...,done:true/false}

// 简直了，对吗！这并不是巧合，这是JS特意设计的！


