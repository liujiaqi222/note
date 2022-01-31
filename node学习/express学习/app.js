const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log('here');
  res.status(200).json({msg:'error'})
})



app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});

