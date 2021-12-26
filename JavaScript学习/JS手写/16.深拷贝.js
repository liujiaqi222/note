function deepClone(target) {
  if (typeof target === 'object' && target !== null) {
    // 创建容器
    const result = Array.isArray(target) ? [] : {};
    // 遍历拷贝
    const keyArr = Object.keys(target);
    keyArr.forEach(key => {
      result[key] = deepClone(target[key]);
    })
    return result;
  } else {
    return target;
  }
}

const test = deepClone({ a: 1, b: [2], c: { t: [23] } });
console.log(test);