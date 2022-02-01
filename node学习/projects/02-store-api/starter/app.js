require('dotenv').config();
require('express-async-errors');
const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const app = express();

app.use(express.json());


// router 
const router = require('./routes/products.js');
app.use('/api/v1/products', router);


app.get('/', (req, res) => {
  res.send('<h1>store api <a href ="/api/v1/products">products route</a></h1>')
})



app.use(notFoundMiddleware);
app.use(errorHandler);

const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log('running at http://localhost:3000'));
  } catch (err) {
    console.log(err);
  }
}

start();