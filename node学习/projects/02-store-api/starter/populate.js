require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); //删除所有的
    await Product.create(jsonProducts) // 传入的一个数组
    process.exit(0)
  }
  catch (err) {
    console.log(err);
    process.exit(1)
  }
}
start()
