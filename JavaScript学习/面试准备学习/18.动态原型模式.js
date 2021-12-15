function Person(name,age) {
  this.name = name;
  this.age = age;
  
  // 可能会多次调用构造函数，为了避免多次在原型上添加prototype
  if (!this.sayName) {
    console.log('给原型添加sayName函数');
    // 如果当sayName不存在的时候，给其添加
    Person.prototype.sayName = function () {
      console.log(this.name);
    }
  }
}

// 创建了2个对象
const jiaqi = new Person('嘉琪', 22);
const spencer = new Person('spencer', 22);

jiaqi.sayName();
spencer.sayName();


// 给原型添加sayName函数
// 嘉琪
// spencer