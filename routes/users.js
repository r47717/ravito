const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../lib/passport');

router.get('/profile', passport.protectRoute, async function (req, res) {
    res.render('profile');
});

module.exports = router;
