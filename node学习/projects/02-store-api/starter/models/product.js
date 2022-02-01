const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '必须提供产品名字']
  },
  price: {
    type: Number,
    required: [true, '必须提供产品价格']
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default:4.5,
  },
  createAt: {
    type: Date,
    default:Date.now()
  },
  // 公司限定为如下四个值
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message:'{VALUE}不支持'
    },
  }
})

module.exports = mongoose.model('Product', productsSchema);



