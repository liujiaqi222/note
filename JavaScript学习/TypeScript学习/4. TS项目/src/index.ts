import  './style/index.scss';
import ScorePanel from './modules/ScorePanel';
import Food from './modules/Food';
import Snake from './modules/Snake';

const food = new Food();
console.log(food.X);
food.change();

const score = new ScorePanel();
score.addScore();
score.addScore();
score.addScore();

const snake = new Snake();
console.log();

