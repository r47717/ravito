const express = require('express');
const router = new express.Router();
const csrf = require('csurf');
const csrfMiddleware = csrf({ cookie: true });
const passport = require('../lib/passport');
const User = require('../models/user');

router.get('/login', csrfMiddleware, function(req, res, next) {
    res.render('login', { csrfToken: req.csrfToken() })
});

router.post('/login', csrfMiddleware, passport.authenticate('local', {
    successRedirect: '/', failureRedirect: '/login' }));

router.get('/register', csrfMiddleware, function(req, res, next) {
    res.render('registration', { csrfToken: req.csrfToken() });
});

router.post('/register', csrfMiddleware, async function(req, res, next) {
    const {name, email, password, password_confirm} = req.body;
    const user = await User.create({
        username: email,
        name,
        password,
        phone: '',
        address: '',
        status: 'active',
        admin: false
    });
    
    passport.authenticate();
    
    res.redirect('/');
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;