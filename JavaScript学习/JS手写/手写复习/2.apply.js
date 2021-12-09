function apply(fn, obj, arr) {
  if (obj == null || typeof obj !== 'object') {
    obj = globalThis;
  }
  obj.temp = fn;
  const result = obj.temp(...arr);
  delete obj.temp;
  return result;
}

c = 5;

function test(a, b) {
  return a + b + this.c;
}

let objTest = { c: 2 };

console.log(apply(test,objTest,[1,3]));