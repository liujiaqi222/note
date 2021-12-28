class EventBus {
  constructor() {
    this.callbackList = {};
  }
  // 绑定事件
  on(type, callback) {
    // 如果已经存在该事件
    if (this.callbackList[type]) {
      this.callbackList[type].push(callback);
    } else {
      this.callbackList[type] = [callback];
    }
  }
  // 触发事件
  emit(type,data) {
    if (this.callbackList[type] && this.callbackList[type].length > 0) {
      // 遍历执行数组
      this.callbackList[type].forEach(callback => {
        callback(data);
      })
    }
  }
  // 解绑事件
  off(eventName) {
    // 如果传入了eventName，则删除对应的回调
    if (eventName) {
     return  delete this.callbackList[eventName];
    }
    // 如果名字传入事件名字，则清空对象
    this.callbackList = {};

  }
}

const bus = new EventBus();

bus.on('login', data => {
  console.log(data+'用户已经登录');
})

bus.on('login', data => {
  console.log(data+'登录数据已经写入');
})

setTimeout(() => {
  bus.emit('login','张三')
}, 200);


bus.off('login')