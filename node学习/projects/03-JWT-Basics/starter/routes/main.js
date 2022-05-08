const router = require('express').Router();
const {login,dashboard} = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth')

// 在能访问dashboard之前需要验证token
router.route('/dashboard').get(authenticationMiddleware,dashboard);
router.route('/login').post(login);

module.exports = router;
