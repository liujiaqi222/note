const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');


const register = async (req, res) => {
  const user = await User.create(req.body)
  console.log(user);
  res.status(StatusCodes.CREATED).json({
    user
  })
}

const login = async (req, res) => {
  res.send('register login');
}

module.exports = {
  register, login
}