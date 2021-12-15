console.log(isNaN('test')); //true 因为不能转换为数字，所以是NaN
console.log(Number.isNaN('test')); //false 不会自动转换

console.log(isNaN(NaN)); //true
console.log(Number.isNaN(NaN)); //true

console.log(isNaN(0/0)); //true
console.log(Number.isNaN(0/0));//true