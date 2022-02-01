const getAllProductsStatics = async (req, res, next) => {
  res.status(200).json({ msg: 'products testing route' })
}
const getAllProducts = async (req, res, next) => {
  res.status(200).json({ msg: 'getAllProducts' })
}

module.exports = {
  getAllProductsStatics,
  getAllProducts
}
