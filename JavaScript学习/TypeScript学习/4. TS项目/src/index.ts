import  './style/index.scss';
import ScorePanel from './modules/ScorePanel';
import Food from './modules/Food';

const food = new Food();
console.log(food.X);
food.change();

const score = new ScorePanel();
score.addScore();
score.addScore();
score.addScore();

