function deepClone(target) {
  if (typeof target === 'object' && target !== 'null') {
    
  }
}

const test = deepClone({ a: 1, b: [2], c: { t: [23] } });
console.log(test);