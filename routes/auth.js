const express = require('express');
const router = new express.Router();
const passport = require('../lib/passport');
const User = require('../models/user');

router.get('/login', function(req, res, next) {
    res.render('login', { csrfToken: req.csrfToken() })
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', failureRedirect: '/login' }));

router.get('/register', function(req, res, next) {
    res.render('registration', { csrfToken: req.csrfToken() });
});

router.post('/register', async function(req, res, next) {
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