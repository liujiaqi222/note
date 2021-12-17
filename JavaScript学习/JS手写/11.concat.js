function concat(arr,...arg) {
  // 浅拷贝 arr
  let result = [...arr];
  [...arg].forEach(item => {
    // 判断 item 是否为数组
    result.push.apply(result, Array.isArray(item)?item:[item])
  })
  return result;
}

console.log(concat([1,23],1,2,[33,9]));

console.log(Array.isArray([1,2,3,3]));