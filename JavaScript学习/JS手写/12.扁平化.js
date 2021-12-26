// const arr = [1, 2, [3, 4,[1,3,[3]]], 8];

// function flat(arr,n) {
//   let times = 0; //利用闭包记住times
//   // 遍历数组
//   function flatten(arr) {
//     const result = [];
//     arr.forEach(item => {
//       if (Array.isArray(item)) {
//         // 如果元素时数组则再次进行flatten操作且times+1
//         if (times >= n) {
//           result.push(item);
//         }
//         times++;
//         result.push(...flatten(item));
//       } else {
//         result.push(item);
//       }
//     });
//     return result;
//   }
//   return flatten(arr);
// }

// console.log(flat(arr,2)); //[1, 2, 3, 4,1, 3, [3], 8]


function getSum(obj){
	let o = obj;
    //如果是数字则返回数字 如果是string类型，如果能转为对象则继续
    if(typeof obj !== 'object'){
    	if(typeof obj==='string' && typeof JSON.parse(obj) === 'object'){
            o = JSON.parse(obj)
        }else if(!Number.isNaN(Number(item))  ){
        return Number(obj);
        }
    }
    // 获取对象的值的数组
    const valueArr = Object.values(o);
    let result=0;
    valueArr.forEach(item => {
    	//如果属性值是对象的话 则递归
        if(typeof  item === 'object'){
        result +=getSum(item);
        }else if (!Number.isNaN(Number(item))){
        	result += Number(item);
        }
    })
    
    return result;
    
}

const jsonObj = {
  a: 1,
  b: {
      c: 2,
      d: "abc",
      e: [1,2]
  },
  e: {
      f: {
          g: 3
    },
    m: {
      k:30,
    }
  }
}

console.log(getSum(jsonObj));

