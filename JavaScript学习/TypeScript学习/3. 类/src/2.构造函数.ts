class People{
  name: string;
  age: number;
  constructor(name:string, age:number) {
    this.name = name;
    this.age = age;
  }
}

const jiaqi = new People('嘉琪', 22);
console.log(jiaqi);


export default {};