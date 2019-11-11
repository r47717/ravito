const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async function(req, res) {
  const users = await User.findAll();
  res.render('users', {
    users
  });
});


router.get('/:id', function(req, res) {
  res.send('respond with a resource');
});


module.exports = router;
