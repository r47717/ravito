const express = require('express');
const router = new express.Router();

router.get('/login', function(req, res, next) {
    res.render('login')
});

router.get('/register', function(req, res, next) {
    res.render('registration');
});

module.exports = router;