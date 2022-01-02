function Hello(name) {
  this.name = name;
}
Hello.prototype = null
const jiaqi = new Hello('嘉琪');
console.log(jiaqi instanceof Object);

// 判断构造函数cons是否为obj的原型
function myInstanceOf(obj, cons) {
  // 如果不是对象或者为null则直接返回false
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = Object.getPrototypeOf(obj);
  while (true) {
    if (proto === null) return false;
    if (proto === cons.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}


console.log(myInstanceOf(jiaqi,Hello));
