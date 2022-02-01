const errorHandlerMiddleWare = (err, req, res, next) => {
  return res.status(err.statusCode).json({ message:err.message,status:err.statusCode});
}

module.exports = errorHandlerMiddleWare;