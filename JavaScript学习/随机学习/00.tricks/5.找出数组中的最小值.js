const arr = [1, 2, 3, 4];
console.log(Math.min(...arr));
//或者写成
console.log(Math.min.apply(null, arr));
