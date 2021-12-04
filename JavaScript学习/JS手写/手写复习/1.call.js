function call(fn, obj, ...args) {
  // 如果传进来的obj为null undefined或者说不为对象
  if (obj == null || typeof obj !== 'object') {
    obj = globalThis;
  }
  obj.temp = fn;
  let result = obj.temp(...args);
  console.log(result);
  delete obj.temp;
  return result;
}
c = 5;

function test(a, b) {
  return a + b + this.c;
}

let objTest = { c: 2 };

console.log(call(test, null, 1, 2));