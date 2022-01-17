function fn<T, K>(a: T, b: K): T {
  return a;
}

fn<number, string>(20, 'h');

interface MyInterface {
  length: number
}
// 要求传入的参数必须有length属性
function fn2<T extends MyInterface>(a: T): number {
  return a.length;
}

fn2({ length: 2 });
fn2('hello'); // 字符串自带length属性

class MyClass<T>{
  name: T
  constructor(name: T) {
    this.name = name;
  }
}

const jiaqi = new MyClass<string>('jiaqi');

export { };
