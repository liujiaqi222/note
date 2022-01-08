class Singleton {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
  static instance = null;
  static createInstance(name) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Singleton(name);
    return this.instance;
  }
}

let obj1 = Singleton.createInstance('jiaqi');
let obj2 = Singleton.createInstance('嘉琪')

obj2.getName(); //jiaqi

console.log(obj1===obj2);