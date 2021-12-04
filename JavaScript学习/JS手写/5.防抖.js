function debounce(callback, time) {
  let timer = null;
  return function (e) {
    // 如果timer存在，则清除定时器
    timer && clearTimeout(timer);
    // 然后重新开始计时
    timer = setTimeout(() => {
      // 这里的this是来自上级作用域的
      callback.call(this, e);
      timer = null; //重置定时器变量，不然上面的timer && clearTimeout(timer)就是无效代码了，不重置的话timer就一直有值
    }, time);
  }
}