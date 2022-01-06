function deepClone(target) {
  return JSON.parse(JSON.stringify(target))
}

const str = { a: 1, b: [2], c: { t: [23] }, m() { return 2 } };

//循环引用
str.b.push(str.c);
str.c.j = str.b;

const test = deepClone(str);
console.log(test);