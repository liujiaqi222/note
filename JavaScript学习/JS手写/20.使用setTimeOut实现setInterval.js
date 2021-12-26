function myInterval(fn,time) {
  setTimeout(() => {
    // 执行函数
    fn();
    myInterval(fn,time)

  }, time);
}

