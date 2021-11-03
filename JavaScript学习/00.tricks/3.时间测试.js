// let startAt = performance.now();

console.time("用时");

// 超级复杂的代码
for (let i = 0; i < 3333; i++){
    console.log(i);
}

let endAt = performance.now();

// console.log(endAt-startAt); //390ms

console.timeEnd("用时");