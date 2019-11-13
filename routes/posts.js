const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const passport = require('../lib/passport');

router.get('/', async function (req, res, next) {
    console.log(req.user);
    const posts = await Post.findAll();
    res.render('index', {posts});
});

router.get('/posts/category/:category', async function (req, res, next) {
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

router.get('/posts/my', passport.protectRoute, async function (req, res, next) {
    const posts = await req.user.getPosts();
    console.log(posts);
    res.render('index', {posts});
});

router.get('/posts/new', passport.protectRoute, async function (req, res, next) {
    res.render('newpost', { csrfToken: req.csrfToken(), categories: JSON.stringify(Post.categoryNames) });
});

router.post('/posts', passport.protectRoute, async function(req, res) {
    const {title, description, contacts, category} = req.body;
    const post = await Post.create({
        title, description, contacts, category
    });
    await req.user.addPost(post);
    res.redirect('/');
});

module.exports = router;
