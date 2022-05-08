const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true })
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // 正则匹配name，大小写不敏感
    queryObject.name = { $regex: name, $options: 'i' };
  }


  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    // 将price>40, rating>=4
    // 替换为 price-$gt-10,rating-$gte-4
    let filters = numericFilters.replace(regEx, match => {
      return `-${operatorMap[match]}-`
    });
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }

    })
  }
  let products = Product.find(queryObject)
  if (sort) {
    const sortList = sort.split(',').join(' ');
    console.log(sortList);
    products = products.sort(sortList)
  } else {
    // 如果用户没有传递参数，则根据时间来排序
    products = products.sort('createdAt');
  }
  if (fields) {
    const fieldList = fields.split(',').join(' ');
    products = products.select(fieldList)
  }
  //queryObject { price: { '$gt': 10 }, rating: { '$gte': 4 } }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  products = await products.skip(skip).limit(limit);
  res.status(200).json({ length: products.length, products })
}

module.exports = {
  getAllProducts, getAllProductsStatic
}