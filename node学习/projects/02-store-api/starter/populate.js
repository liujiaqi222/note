require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product')

// 厉害了 JSON数据直接require就能获取
const jsonProducts = require('./products.json')


// 把数据填充到database中
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // 把json中的所有数据进行遍历写入数据库
    await Product.deleteMany();

    await Product.create(jsonProducts)
    console.log('ok');
    process.exit(0)
  } catch (err) {
    console.log(err);
    process.exit(1)
  }

}

start();