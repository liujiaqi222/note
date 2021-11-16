const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index',{name:'jiaqi'});
});

app.use('/users', require('./routes/user'));


app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});

