const elements = [1, 2, 3];
const array = ['a', 'b', 'c'];
// array.push.apply(array, elements);

array.push(...elements)

console.log(array);