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
set X(value: number) {
  // 如果值没有变则不用修改
  if (this.X === value) return;

  // X的值合法范围在0~290之间
  if (value < 0 || value > 290) {
    // 蛇撞墙了 抛出异常
    throw new Error('蛇撞墙了');
  }
  // 蛇存在第二节的情况下，不能掉头
  if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
  //  如果发生了掉头，让蛇向反方向继续移动
    if (value > this.X) {
      // 则说明蛇在向右走，发生掉头
      value = this.X - 10;
    } else {
      value = this.X + 10;
    }
  }
  this.head.style.left = value + 'px';
  // 移动身体
  this.moveBody();
  
}
set Y(value: number) {
  if (this.Y === value) return;
  // X的值合法范围在0~290之间
  if (value < 0 || value > 290) {
    // 蛇撞墙了
    throw new Error('蛇撞墙了');
  }
  // 蛇存在第二节的情况下，不能掉头
  if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
    //  如果发生了掉头，让蛇向反方向继续移动
      if (value > this.Y) {
        // 则说明蛇在向下走，发生掉头
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
  this.head.style.top = value + 'px';
  // 移动身体
  this.moveBody();
}
  // 蛇身体增长
  snakeGrow() {
    console.log('grow');
    this.snake.insertAdjacentHTML('beforeend', '<div></div>');
  }
  // 蛇身移动
  // 蛇身应该从最后一节开始改，让最后一节找倒数第二节的位置，依次类推
  moveBody() {
    // 第4节 = 第3节的位置
    // 第3节 = 第2节的位置
    // 第2节 = 蛇头的位置
    // 不用管蛇头，蛇头的位置是由set来改变的
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // 将位置设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

}


export default Snake;
