// 接口用于定义一个对象的结构

interface MyInterface {
  name: string,
  age: number
}

const obj: MyInterface = {
  name: 'sss',
  age: 200,
}


interface UserInterface {
  id: number,
  name: string
}
interface UserInterface {
  age: number,
  
}
const user: UserInterface = { id: 1, name: 'jiaqi', age: 200 }

interface myInter {
  name: string,
  sayHello():void
}

class Test implements myInter {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello(): void {
      
  }
}
