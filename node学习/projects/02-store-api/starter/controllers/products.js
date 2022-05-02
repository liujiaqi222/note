const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true })
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};
  // 设置只搜索
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  const products = await Product.find(queryObject)
  res.status(200).json({ length: products.length, products })
}

module.exports = {
  getAllProducts, getAllProductsStatic
}