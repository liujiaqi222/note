// 延时器版本
// 第一次触发需要等待设定时间才会执行
function throttle(callback, time) {
  let timer = null;
  return function (e) {
    if (!timer) {
      timer = setTimeout(() => {
        callback.call(this, e);
        timer = null;
      }, time);
    }
  }
}

// 时间戳版本
// 第一次触发就会立马执行
function throttle(callback, wait) {
  let start = 0;
  return function (e) {
    // 如果时间间隔大于需要等待的时间
    if (Date.now() - start >= wait) {
      start = Date.now();
      callback.call(this, e);
    }
  }
}



