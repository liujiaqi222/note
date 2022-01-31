const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.get('/', logger,logger,(req, res) => {
  res.render('index',{text:'world'});
})

const userRouter = require('./routes/users')
app.use('/users', userRouter);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next(); 
}


app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});

