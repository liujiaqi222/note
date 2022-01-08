function deepClone(target) {
  // 如果是对象，且不是原始值null
  if (typeof target === 'object' && target !== 'null') {
    // 创建容器
    const result = Array.isArray(target) ? [] : {};
    const keys = Object.keys(target);
    keys.forEach(key => {
      result[key] = deepClone(target[key])
    })
    return result;
  }
  // 如果是原始值，则直接返回
  return target;
}

const str = { a: 1, b: [2], c: { t: [23] },m(){return 'hello'} };
const test = deepClone(str);
str.c.t = [3322332];
//实现了深拷贝
console.log(test.c.t);[23]
// 函数复制没问题
console.log(test.m()); //hello