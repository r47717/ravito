const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const passport = require('../lib/passport');

router.get('/', async function (req, res, next) {
    console.log(req.user);
    const posts = await Post.findAll();
    res.render('index', {posts});
});

router.get('/post/category/:category', async function (req, res, next) {
    const {params: {category}} = req;

    if (Post.categoryNames[category] === undefined) {
        return next();
    }

    const posts = await Post.findAll({
        where: {
            category
        }
    });
    res.render('index', {
        posts,
        category: Post.categoryNames[category]
    });
});

module.exports = router;
