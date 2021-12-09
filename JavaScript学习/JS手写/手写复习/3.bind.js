function call(fn, obj, ...args) {
  if (obj == null || typeof obj !== 'object') {
    obj = globalThis;
  }
  obj.temp = fn;
  let result = obj.temp(...args);
  delete obj.temp;
  return result;
}


function bind(fn, obj, ...args) {
  return function (...args1) {
    return call(fn, obj, ...args,...args1);
  }
}

function add(a, b) {
  return a + b + this.c;
}

let obj = {
  c: 11
}

let fn2 = bind(add, obj, 1, 2);
console.log(fn2()); //14