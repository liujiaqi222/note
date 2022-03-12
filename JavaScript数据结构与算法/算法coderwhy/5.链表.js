// 链表中的每一项
class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

class LinkedList {
  constructor() {
    this.count = 0;
    this.head = undefined;
  }
  push(element) {
    const node = new Node(element);
    // 如果链表为空
    if (this.head == null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }
  removeAt(index) {
    // 检查是否越界
    if (index < 0 || index >= this.count) return;

    let current = this.head;
    // 移除第一项
    if (index === 0) {
      this.head = this.head.next;
    }
    // 移除其他项
    else {
      let previous = this.getElementAt(index - 1);
      // 找到被移除元素的前一项
      current = previous.next;
      previous.next = current.next;
    }
    this.count--;
    return current.element;
  }
  insert(element, index) {
    // 检查是否越界
    if (index < 0 || index >= this.count) return false;
    const node = new Node(element);
    // 在第一个位置添加
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let previous = this.getElementAt(index - 1);
      let current = previous.next;
      node.next = current;
      previous.next = node;
    }
    this.count++;
    return true;
  }
  // 返回一个元素的位置
  indexOf(element) {
    let current = this.head;
    let i;
    for (i = 0; current.element !== element&&current!=null; i++) {
      current = current.next;
    }
    if(i<this.count-1 ||(i===this.count-1 && current.element=== element)) return i;
    return -1;

  }

  remove(element) {
    const index = this.indexOf(element);
     return this.removeAt(index);
  }

  getElementAt(index) {
    if (index < 0 || index >= this.count) return;
    let node = this.head;
    for (let i = 0; i < index && node != null; i++) {
      node = node.next;
    }
    return node;
  }

  isEmpty() {
    return this.count===0;
  }
  get size() {
    return this.count;
  }
  // 将linkedList对象转换成一个字符串
  toString() {
    if(this.head == null) return '';
    let str = '';
    let current = this.head;
    for(let i=0;i<this.count;i++){
      str+= current.element + ' ';
      current = current.next;
    }
    return str;
  }
}

const linkedList = new LinkedList();
linkedList.push(2);
linkedList.push(100);
linkedList.push(100);
linkedList.push(23);
linkedList.push(100);
linkedList.push(100);

console.log(linkedList.remove(2))
console.log(linkedList.remove(100))
linkedList.insert(39,3)
linkedList.removeAt(2)
console.log(linkedList.toString())
