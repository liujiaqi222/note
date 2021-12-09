// 为一个表示数值范围的类定义了一个原型对象，同时也定义了一个工厂函数用于创建和初始化该类的新实例。

// 这个工厂函数返回了一个新范围的对象
function range(from, to) {
  // 继承下面定义的原型对象
  let r = Object.create(range.methods);
  // 这些属性不是继承的，是当前对象独有的
  r.from = from;
  r.to = to;
  return r;
}

range.methods = {
  // 如果 x 在范围内则返回 true，否则返回 false
  includes(x) { return this.from <= x && x <= this.to },
  
}

function Rabbit() {}
// by default:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); 

console.log(rabbit.__proto__.constructor === Rabbit);