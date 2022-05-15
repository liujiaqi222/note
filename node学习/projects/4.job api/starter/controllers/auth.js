const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors/index')

const register = async (req, res) => {
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({
    token: user.createJWT(), user: { name: user.name }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password!')
  }
  // 根据邮箱查找用户
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid email');
  }
  // 调用user的comparePassword方法对比密码
  const isPasswordCorrect = await user.comparePassword(String(password))
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  res.status(StatusCodes.OK).json({
    token: user.createJWT(), user: { name: user.name }
  })
}

module.exports = {
  register, login
}