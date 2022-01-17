// 定义表示积分牌的类

export default class ScorePanel{
  score = 0;
  level = 1;
  scoreELe: HTMLElement;
  levelEle: HTMLElement;
  // 设置最大等级
  maxLevel: number;
  // 设置多少分升一级
  scoreToLevelUp: number;
  constructor(maxLevel:number = 10,scoreToLevelUp:number =10) {
    this.scoreELe = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.scoreToLevelUp = scoreToLevelUp;
  }
  // 加分
  addScore() {
    this.scoreELe.textContent = ++this.score + '';
    // 每加scoreToLevelUp分升一级
    if (this.score % this.scoreToLevelUp === 0) {
      this.levelUp();
    }
  }
  // 升级
  levelUp() {
    // 设置上限为10级
    if (this.level < this.maxLevel) {
      this.levelEle.textContent = ++this.level + '';
    }
  }
}