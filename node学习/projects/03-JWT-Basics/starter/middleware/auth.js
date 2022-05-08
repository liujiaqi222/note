const { BadRequestError, UnauthenticatedError } = require('../errors/index.js');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('No token provided');
  }
  const token = authHeader.split(' ')[1];
  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next(); // 一定不要忘记了这个next，不然进入不了下一个route

  } catch (err) {
    throw new BadRequestError('Not authorized to access this route');

  }

}

module.exports = authenticationMiddleware