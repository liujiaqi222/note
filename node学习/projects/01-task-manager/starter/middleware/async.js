const CustomError = require('../errors/custom-error.js');
const asyncWrapper = fn => {
  return async (req, res,next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(new CustomError(err,500));
   }
  }
}

module.exports = asyncWrapper;

