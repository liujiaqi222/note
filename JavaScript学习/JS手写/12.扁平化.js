const arr = [1, 2, [3, 4,[1,3,[3]]], 8];

function flat(arr,n) {
  let times = 0; //利用闭包记住times
  // 遍历数组
  function flatten(arr) {
    const result = [];
    arr.forEach(item => {
      if (Array.isArray(item)) {
        // 如果元素时数组则再次进行flatten操作且times+1
        if (times >= n) {
          result.push(item);
        }
        times++;
        result.push(...flatten(item));
      } else {
        result.push(item);
      }
    });
    return result;
  }
  return flatten(arr);
}

console.log(flat(arr,2)); //[1, 2, 3, 4,1, 3, [3], 8]

