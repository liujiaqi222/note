// 给定一个 Uint8Array 数组，请写一个函数 concat(arrays)，将数组拼接成一个单一数组并返回。
function concat(arrays) {
  return new Uint8Array(
    arrays.reduce((acc, cur) => {
      return [...acc, ...cur];
    })
  );
}
console.log(concat([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]));
let arr8 = new Uint8Array([1, 23, 4]);

console.log([...arr8]);
