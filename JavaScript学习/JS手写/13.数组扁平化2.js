
// Array.prototype.myFlat = function (dep = 1) {

//   return this.reduce((acc, val) => {
//     console.log(acc,'0');
//     const test = Array.isArray(val) && dep > 0 ? val.myFlat(--dep) : val;
//     return acc.push(test);

//   }, [])
// }

// function flat(arr, dep = 1) {
//   return arr.reduce((acc, val) => {
//     return acc.concat(Array.isArray(acc)&&dep>0?val.flat(--dep));
//   }, []);
// }

const arr = [1, 2, [3, 4, [1, 3, [3]]], 8];

// console.log(arr.myFlat(2));

console.log(Object.prototype.toString.call(NaN));