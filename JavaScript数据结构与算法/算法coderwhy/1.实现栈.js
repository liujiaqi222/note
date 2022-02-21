class Stack{
  // 存放栈中的元素
   items = [];
  
  // 1.将元素压入进栈
  push(item) {
    this.items.push(item);
  }
  // 2.将元素弹出
  pop() {
    this.items.unshift();
  }
  // 3.返回栈顶元素
  get peek() {
    return this.items[this.items.length - 1];
  }
  // 4.判断是否为空
  isEmpty() {
    return this.items.length === 0 ? true : false;
  }
  // 5.个数
  get size() {
    return this.items.length;
  }
  // 6.自定义一种toString方法
  toString() {
    return this.items.reduceRight((acc, cur) => acc + ' ' + cur);
  }
}
module.exports = Stack;

