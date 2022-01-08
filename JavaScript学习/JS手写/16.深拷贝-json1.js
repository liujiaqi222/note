function deepClone(target) {
  return JSON.parse(JSON.stringify(target))
}

const str = { a: 1, b: [2], c: { t: [23] }, m() { return 2 } };


const test = deepClone(str);
console.log(test);