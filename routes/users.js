const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../lib/passport');
const settingsPage = require('../app/profile-settings');
const {renderToString} = require('react-dom/server');

router.get('/profile/settings', passport.protectRoute, async function (req, res) {
    const settings = renderToString(settingsPage);
    res.render('profile/settings', {settings});
});

module.exports = router;
