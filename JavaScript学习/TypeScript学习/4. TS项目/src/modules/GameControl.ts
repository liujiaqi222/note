import ScorePanel from './ScorePanel';
import Food from './Food';
import Snake from './Snake';

// 游戏控制器
class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  // 存储按键方向
  direction: string = '';
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }
  // 游戏初始化 调用后游戏开始
  init() {
    // 键盘按下的事件
    document.addEventListener('keydown', this.keyDownHandler);
    this.run();
    
  }
  // 创建键盘按下后的回调
  // 使用箭头函数，之后的this.direction中的this就是指向上一级
  keyDownHandler = (e: KeyboardEvent) => {
    // ArrowUp ArrowLeft ArrowRight ArrowDown
    // IE Up Left Right Down
    this.direction = e.key;
  }

  // 让蛇进行移动
  run() {
    // 根据this.direction让蛇进行移动
    // 向上：top减小 向下：top增加 向左：left减少 向右：left增加
    let X = this.snake.X;
    let Y = this.snake.Y;
    // 根据按键方向修改X和Y的值
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
      case 'w':
        Y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
      case 's':
        Y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
      case 'a':
        X -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
      case 'd':
        X += 10;
        break;
    }
    // 修改蛇的X和Y值
    this.snake.X = X;
    this.snake.Y = Y;

  }
}

export default GameControl;