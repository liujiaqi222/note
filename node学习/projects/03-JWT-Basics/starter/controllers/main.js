const CustomAPIError = require('../errors/custom-error');
const { BadRequestError } = require('../errors/index.js');

const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(process.env.JWT_SECRET);
  if (!username || !password) {
    throw new BadRequestError('please provide email and password');
  }
  const id = Date.now();
  // 第一个参数是payload，第二个参数是secret，最后一个参数是options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello, ${req.user.username}`,
    secret: `here is your authorized data,your lucky number is ${luckyNumber}`
  })
}

module.exports = {
  login, dashboard
}