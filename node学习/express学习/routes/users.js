const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('user list')
})
router.get('/new', (req, res) => {
  res.render('users/new',{name:'jiaqi'})
})

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('create user');
})

router.route('/:id')
  .get((req, res) => {
    res.send(`get the id is ${req.params.id}`)
  })
  .post((req, res) => {
    res.send(`add the id is ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`update the id is ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`dele the id is ${req.params.id}`)
  })

const users = [{ name: 'jiaqi' }, { name: 'sally' }];


router.param('id', (req, res, next, id) => {
  req.user = users[id]
  res.user = users[id]
  next();
})



module.exports = router;
