function F() {
}

const obj = new F();


// 验证 obj的原型是否为F.prototype
console.log(Object.getPrototypeOf(obj) === F.prototype); //true
// 验证F.prototype的原型是否为 Object.prototype
console.log(Object.getPrototypeOf(F.prototype) === Object.prototype); //true

// 验证普通构造函数F的原型是否为Function.prototype
console.log(Object.getPrototypeOf(F) === Function.prototype); //true
// 验证Function.prototype 的原型是否为 Object.prototype
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype); //true


