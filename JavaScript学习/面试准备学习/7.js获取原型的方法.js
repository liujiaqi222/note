let obj = {};
obj.__proto__
Object.getPrototypeOf(obj)
obj.constructor.prototype

console.log(Number.MAX_SAFE_INTEGER); //9007199254740991
console.log(Number.MIN_SAFE_INTEGER); //-9007199254740991
console.log(Math.pow(2, 53) - 1); //9007199254740991

console.log(typeof NaN); // number
console.log(NaN === NaN); //false
console.log(NaN !== NaN); //true

console.log(isNaN('22')); //false
console.log(Number.isNaN('l22l')); //true