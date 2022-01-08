function deepClone(target,map = new Map()) {
  // 如果是对象，且不是原始值null
  if (typeof target === 'object' && target !== 'null') {
    // 克隆前判断数据之前是否克隆过
    const cache = map.get(target);
    if (cache) {
      // 如果克隆过了，则直接返回
      return cache;
    }
    // 创建容器
    const result = Array.isArray(target) ? [] : {};
    
    // target为要被克隆的数据，result为克隆的结果
    // 把target做为键，result作为值
    // Map的好处在于键可以为任意类型
    // 等下如果又克隆到了相同的target，就直接从Map中读取数据
    map.set(target, result);
    
    const keys = Object.keys(target);
    keys.forEach(key => {
      // 我们需要把map传到函数deepclone中保留map的数据
      result[key] = deepClone(target[key],map)
    })

    
    return result;
  }
  // 如果是原始值，则直接返回
  return target;
}

const str = { a: 1, b: [2], c: { t: [23] }, m() { return 'hello' } };
//循环引用
str.b.push(str.c);
str.c.j = str.b;

const test = deepClone(str);
console.log(test);
// 函数复制没问题
console.log(test.m()); //hello