//[1, 2, 3, 4,1, 3, [3], 8]

const arr = [1, 2, 3, [4, 1, 3, [3]], 8];

function flat(arr, dep = 1) {
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) && dep > 0 ? flat(val, --dep) : [val]);
  },[])
}

console.log(flat(arr,1));