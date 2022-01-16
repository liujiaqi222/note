class Observer{
  // 将要被监听的对象传递给Observer这个类
  // 给这个对象的所有属性添加get和set方法
  constructor(target) {
    this.observer(target);
  }
  observer(target) {
    if (typeof target === 'object' ||  target !== null) {
      const keys = Object.keys(target);
      keys.forEach(key => {
        this.defineReactive(target, key, target[key]);
      })
    }
  }
  defineReactive(target, key, value) {
    // 如果属性的取值是对象，那么也需要给这个对象的所有属性添加get/set劫持
    this.observer(value);
    Object.defineProperty(target, key, {
      get() {
        return value;
      },
      set:(newValue)=> {
        if (newValue !== value) {
          //newValue可能也是对象，也要给新值进行监听
          this.observer(newValue);
          value = newValue;
          console.log('监听到数据变化');
        }
      }
    })
  }
}

let obj = { name: '1222' ,hobby:{a:12,b:{m:1}}};
new Observer(obj);

obj.hobby.b.m = 23;

