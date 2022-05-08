const { CustomAPIError } = require('../errors/index.js');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  console.log(err);
  return res.status(500).send(err)
}

module.exports = errorHandlerMiddleware
