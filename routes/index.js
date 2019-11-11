const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
