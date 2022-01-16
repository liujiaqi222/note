//[1, 2, 3, 4,1, 3, [3], 8]

const arr = [1, 2, 3, [4, 1, 3, [3]], 8];

function flat(arr,dep=1) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur)&&dep>0 ? flat(cur,dep-1):[cur]) 
  },[])
}

console.log(flat(arr,1));