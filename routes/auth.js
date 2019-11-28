const express = require('express');

const router = new express.Router();
const passport = require('../lib/passport');
const User = require('../models/user');

router.get('/login', (req, res, next) => {
    res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    const redirectTo = req.session.redirectTo || '/';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
});

router.get('/register', (req, res, next) => {
    res.render('registration', { csrfToken: req.csrfToken() });
});

router.post('/register', async (req, res, next) => {
    const {
        name, email, password, password_confirm,
    } = req.body;
    const user = await User.create({
        username: email,
        name,
        password,
        phone: '',
        address: '',
        status: 'active',
        admin: false,
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        }
        return res.redirect('/');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
