function Person(name, age) {
  let obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sayName = function () {
    console.log(this.name);
  }
}
// 这里写的是 new Person 而工厂模式写的是 Person()
const jiaqi = new Person('jiaqi', 222);

function SpecialArray(...args) {
  const arr = new Array();
  arr.push(...args);
  // 添加方法
  arr.toPipedString = function () {
    return this.join('|');
  }
  return arr;
}

const colors = new SpecialArray('red', 'blue', 'green');
console.log(colors.toPipedString()); //red|blue|green
