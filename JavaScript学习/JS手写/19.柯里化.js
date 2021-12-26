function curry(fn) {
  const argsNum = fn.length;
  return function func (...args) {
    // 如果参数数量小于fn函数参数的数量
    if (args.length < argsNum) {
      // 使用bind记住参数
      return func.bind(null, ...args);
    } else {
      // 当传入总参数大于等于函数的总参数长度后
      // 执行fn，并返回结果
      return fn.apply(null,args)
    }
  }
}



function sum(a, b,c,d) {
  return a + b+c+d;
}


const fn = curry(sum);
console.log(fn(1)(2)(3)(4)); //10
console.log(fn(1,2)(3)(4)); //10
console.log(fn(1,2,3)(4)); //10
console.log(fn(1,2,3,4)); //10

