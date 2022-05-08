const router = require('express').Router();
const {login,dashboard} = require('../controllers/main');

router.route('/dashboard').get(dashboard);
router.route('/login').post(login);
console.log(router);

module.exports = router;
