class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(this.name + '吃东西');
    }
}
// 定义人类
// 继承自动物类，人类将会拥有所有的动物类的属性和方法
// 子类如果存在和父类相同的方法，则子类中的方法会覆盖父类的方法
class People extends Animal {
    sayHello() {
        console.log(`${this.name} 说你好啊`);
    }
}
const jiaqi = new People('嘉琪', 22);
jiaqi.sayHello();
export default {};
