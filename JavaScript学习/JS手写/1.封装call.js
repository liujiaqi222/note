// 核心思想
// 将fn做为对象的一个属性，然后对象打点调用函数，这样函数中的this就会指向对象
// 注意点：
// 1.原生的call函数，如果处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
// 2. globalThis 是 ES10 的语法，如果在node环境下，则指向global，如果在浏览器环境下则指向windows
function call(fn, obj, ...args) {
  if (obj == undefined || typeof obj !== 'object') {
    obj = globalThis;
  }
  // 将fn做为obj的属性
  obj.temp = fn;
  // 展开剩余参数
  const result = obj.temp(...args);
  delete obj.temp;
  // 一定要记得将函数的执行结果进行返回 虽然可能函数并没有返回值
  return result;
}

let testObj = { c: 5 };

global.c =7
function add(a, b) {
  console.log(a+b+this.c);
}
call(add,null,2,4) //13
call(add,testObj,2,4) //11