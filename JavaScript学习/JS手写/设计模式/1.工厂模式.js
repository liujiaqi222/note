class Factory{
  static create(name) {
    return new Person(name);
  }
}

class Person{
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

// 通过工厂的create方法返回一个对象
const jiaqi = Factory.create('嘉琪');

console.log(jiaqi.getName()); //嘉琪