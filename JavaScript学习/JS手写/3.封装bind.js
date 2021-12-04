// test
function add(a, b) {
  return a + b + this.c;
}

let obj = {
  c: 11
}

// 可见bind由下面两种传参方式
let fn = add.bind(obj, 1, 2);
console.log(fn()); //14
let fn1 = add.bind(obj);
console.log(fn1(1,2)); //14

function call(fn, obj, ...arg) {
  if (obj == null) {
    obj = globalThis;
  }
  obj.temp = fn;
  let result = obj.temp(...arg);
  delete obj.temp;
  return result;
}

function bind(fn, obj, ...arg) {
  // 会返回一个函数，返回的函数被调用的时候还是可以接收参数
  return function (...arg1) {
    // 执行call
    return call(fn,obj,...arg,...arg1)
  }
}

let fn2 = bind(add, obj, 1, 2);
console.log(fn2()); //14

let fn3 = bind(add, obj);
console.log(fn3(1,2)); //14

