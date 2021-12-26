class Promise {
  // 构造器
  constructor(executor) {
    // 初始化state的状态
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 成功
    let resolve = value => {
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'fulfilled';
        // 存储成功的值
        this.value = value;
      }
    };

    // 失败
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
      }
    };

    // 执行
    // 由于new Promise((resolve, reject)=>{})，所以传入一个参数（函数），秘籍里叫他executor，传入就执行。
    // 如果executor执行报错，直接执行reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  // then 方法 有两个参数onFulfilled onRejected
  then(onFulfilled, onRejected) {
    // 状态为fulfilled，执行onFulfilled，传入成功的值

    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    }
     // 状态为rejected，执行onRejected，传入失败的原因
     if (this.state === 'rejected') {
      onRejected(this.reason);
    };

  }
}