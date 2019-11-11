const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async function (req, res, next) {
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

router.get('/post/load-test-data', async function (req, res, next) {
    await Post.sync({force: true});

    const data = require('../models/post/fake-posts');
    data.forEach(async function (item) {
        await Post.create({
            title: item.title,
            description: item.description,
            contacts: item.contacts,
            status: item.status || "active",
            category: item.category
        });
    });
    res.render('index');
});

router.get('/post/load-fake-data', async function (req, res, next) {
    await Post.sync({force: true});

    const faker = require('faker');
    for (let i = 0; i < 30; i++) {
        await Post.create({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            contacts:  faker.internet.email(),
            status: "active",
            category: faker.random.arrayElement(["auto","real-estate","job","service"])
        });
    }

    res.render('index');
});

module.exports = router;
