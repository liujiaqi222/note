function getSum(obj){
	let o = obj;
    //如果是数字则返回数字 如果是string类型，如果能转为对象则继续
    if(typeof obj !== 'object'){
    	if(typeof obj==='string' && typeof JSON.parse(obj) === 'object'){
            o = JSON.stringfy(obj)
        }else if(Number.isNaN(Number(obj))  ){
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
        }else if (Number.isNaN(Number(obj))){
        	result += Number(item);
        }
    })
    
    return result;
    
}

getSum(jsonObj);


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
      }
  }
}