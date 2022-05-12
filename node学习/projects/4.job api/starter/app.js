require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
// connectdb
const connectDB = require('./db/connect')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
  await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`running at http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
