// const arr = [1, 2, 3];
// console.log(arr.map(item => item)); // [ 1, 2, 3 ]
// console.log(arr.map(item => [item]));[[1], [2], [3]]


// console.log(arr.flat());  //[ 1, 2, 3 ]
// console.log([[arr]].flat()); //[ [ 1, 2, 3 ] ]
// console.log([arr,[4,5,6]].flat());
// console.log([arr,[4,5,[6]]].flat(2));

// 删除所有负数并将奇数分成偶数和1
const arr = [new Uint8Array([1,2,3]), new Uint8Array([4,5,6])];
const result = arr.flatMap(item => [...item])

console.log(result);


