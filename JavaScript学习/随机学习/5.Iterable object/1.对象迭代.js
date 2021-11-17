const range = {
    from: 1,
    to: 5
}

// for (let num of range) {
//     console.log(num);
// }
// 会报错 range is not iterable


// 为了让其可迭代，我们需要为对象添加一个Symbol.iterator的方法
// 一个专门用于使对象可迭代的内置 symbol

// 1.当 for..of 循环启动时，它会调用这个方法（如果没找到，就会报错）。
//   这个方法必须返回一个 迭代器（iterator） —— 一个有 next 方法的对象。

// 2.从此开始，for..of 仅适用于这个被返回的对象。

// 3.当 for..of 循环希望取得下一个数值，它就调用这个对象的 next() 方法。

// 4.next() 方法返回的结果的格式必须是 {done: Boolean, value: any}，当 done=true 时，表示迭代结束，否则 value 是下一个值。

// 1.for...of 首先会调用这个Symbol.iterator 方法
range[Symbol.iterator] = function () {

    // 2. 接下来，for..of 仅与此迭代器一起工作，要求它提供下一个值
    return {
        current: this.from,
        last: this.to,
        // 3. next() 在 for..of 的每一轮循环迭代中被调用
        next() {
            // 4. 它将会返回 {done:.., value :...} 格式的对象
            if (this.current <= this.last) {
                return {
                    done: false,
                    value:this.current++
                }
            } else {
                return {done:true}
            }
        }
    }

}

// 现在它可以运行了！
for (let num of range) {
    console.log(num); //1 2 3 4 5
}

// range 自身没有 next() 方法
// 相反，是通过调用 range[Symbol.iterator]() 创建了另一个对象，即所谓的“迭代器”对象，并且它的 next 会为迭代生成值。

