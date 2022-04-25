const express = require('express');
const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products')
require('dotenv').config();


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter);


// 注意要放在其他路由的后面
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONgo_URI)
    app.listen(port, console.log(`running at http://localhost:${port}`))
  } catch (err) {
  }
}

start();