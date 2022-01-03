"use strict";
// 以abstract开头的是抽象类
// 抽象类不能用于创建对象，其他的类可以继承它，一般给基类加上abstract
// 此外也可以在方法之前加上abstract，表示由子类来具体实现
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(`${this.name}正在吃`);
    }
}
class People extends Animal {
    constructor(name, age, gender) {
        super(name, age); //super相当于父类，调用父类的构造函数
        // 此处写的constructor相当于重写了父类的constructor，因此先调用父类的构造函数
        this.gender = gender;
    }
    eat() {
        // super代表当前类的父类
        super.eat(); //调用父类的eat方法
    }
    sayHello() {
        console.log('hello');
    }
}
const jiaqi = new People('jiaqi', 22, 'female');
jiaqi.eat();
