class Queue {
  items = [];
  // 1.加入元素
  enqueue(...item) {
    this.items.push(...item);
  }
  // 2.删除前端元素
  dequeue() {
    this.items.shift();
  }

  // 3.返回第一个前端元素
  front() {
    return this.items[0];
  }

  // 4.查看队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // 5.查看队列中元素的个数
  get size() {
    return this.items.length;
  }
  // 6.toString()
  toString() {
    return this.items.reduce((acc, cur) => {
      return acc + ' ' + cur;
    })
  }
}

module.export = Queue;