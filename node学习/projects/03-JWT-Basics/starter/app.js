require('express-async-errors');
require('dotenv').config()

const express = require('express');
const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

const mainRouter = require('./routes/main')
app.use('/api/v1', mainRouter);
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

