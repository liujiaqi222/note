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
  // 记录游戏是否结束（是否蛇死了）
  isLive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(6,5);
    this.init();
  }
  // 游戏初始化 调用后游戏开始
  init() {
    // 键盘按下的事件
    document.addEventListener('keydown', this.keyDownHandler);
    // 监听方向键按钮的点击事件
    this.btnClick();
    this.run();

  }
  btnClick() {
    const controler = document.querySelector('.controler');
    controler!.addEventListener('click', e => {
      if ((e.target as Element).tagName) {
        this.direction = (e.target as Element).getAttribute('data-d') as string
      }
    })
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
    // 检测蛇是否吃到了食物（食物的位置和蛇的位置是否一致）
    this.checkEat(X, Y);
    try {
      // 修改蛇的X和Y值
      this.snake.X = X;
      this.snake.Y = Y;
    }
    catch (e) {
      // 出现了异常，游戏结束
      alert(e);
      // 将isLive设置为false
      this.isLive = false;
      location.reload()
    }

    //蛇🐍活着的情况下 开启定时调用
    this.isLive && setTimeout(
      this.run.bind(this)
      , 200 - (this.scorePanel.level - 1) * 30)
  }
  // 检测蛇是否迟到了食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置进行重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇身增加一节
      this.snake.snakeGrow();
    }
  }
}

export default GameControl;