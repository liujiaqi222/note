function apply(fn,obj,arr) {
  if (obj == null || typeof obj !== 'object') {
    obj = globalThis;
  }
  obj.temp = fn;
  // 注意这里还是需要用到展开运算符
  // 尽管给apply传的是一个数组，但实例函数运行中还是单个的参数
  let result = obj.temp(...arr);
  delete obj.temp;
  return result;
}

function add(a, b) {
  return a + b + this.c;
}

let obj = { c: 5 };

console.log(apply(add, obj, [1, 2])); // 8

console.log(add.apply(obj,[1,2])); //8