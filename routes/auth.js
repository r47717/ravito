const express = require('express');
const router = new express.Router();
const csrf = require('csurf');
const csrfMiddleware = csrf({ cookie: true });

router.get('/login', csrfMiddleware, function(req, res, next) {
    res.render('login', { csrfToken: req.csrfToken() })
});

router.post('/login', csrfMiddleware, function(req, res, next) {
    res.send('login successful')
});

router.get('/register', csrfMiddleware, function(req, res, next) {
    res.render('registration', { csrfToken: req.csrfToken() });
});

router.post('/register', csrfMiddleware, function(req, res, next) {
    res.send('registration successful');
});

module.exports = router;