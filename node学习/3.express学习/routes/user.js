const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('user list');
})



router.route('/:id')
  .get((req, res) => {
    res.send(`get user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`update user with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`delete user with id ${req.params.id}`);
  })

// 如果匹配到了路径中有id的就执行这个函数
// 而上面的那些get，put，delete都有id这个参数
router.param('id', (req, res, next, id, name) => {
  console.log(id, name);
})


module.exports = router;