class Snake {
  snake: HTMLElement; //装蛇的容器
  head: HTMLElement; //表示蛇头
  bodies: HTMLCollection;  //表示蛇的身体（包括头部）
  constructor() {
    // 获取蛇的容器
    this.snake = document.getElementById('snake')!;
    this.head = document.querySelector('#snake div:first-child')!;
    this.bodies = this.snake.children;
  }
  // 获取蛇头坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  // 设置蛇头的坐标
  set X(value:number) {
    this.head.style.left = value + 'px';
  }
  set Y(value:number) {
    this.head.style.top = value + 'px';
  }
  // 蛇身体增长
  snakeGrow() {
    this.snake.insertAdjacentHTML('beforeend','<div></div>');
  }

}


export default Snake;
