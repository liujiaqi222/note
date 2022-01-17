// 食物类
export default class Food{
  // 定义一个属性表示食物所对应的DOM
  element: HTMLElement;
  // 屏幕宽度除以10的值
  screenWidth = 29;
  constructor() {
    // !告诉ts这个元素不可能为null
    this.element = document.getElementById('food')!;
  }
  // 获取食物X轴坐标 相对于游戏的stage的距离
  get X() {
    return this.element.offsetLeft;
  }
  // 获取食物X轴坐标 
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置的方法
  change() {
    // 随机生成一个随机数
    // 最小为0，最大为290
    // 蛇一次移动10像素 因此食物的位置也应该是是10的倍数
    // 随机生成一个0~29的数字，然后math.round取整0~29,接着再乘以10，实现坐标是10的倍数
    this.element.style.left = Math.round(Math.random() * this.screenWidth) * 10 +'px';
    this.element.style.top = Math.round(Math.random() * this.screenWidth) * 10 +'px';

  }
}