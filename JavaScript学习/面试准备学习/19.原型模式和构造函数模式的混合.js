function Person(name, age) {
  this.name = name;
  this.age = age;
}

//在原型中添加函数
Person.prototype.sayName = function () {
  console.log(this.name);
} 


const jiaqi = new Person('jiaqi', 1000);
jiaqi.sayName();