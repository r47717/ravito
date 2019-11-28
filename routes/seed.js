const express = require('express');

const router = express.Router();

const faker = require('faker');
const User = require('../models/user');
const Post = require('../models/post');
const Image = require('../models/image');

router.get('/seed-data', async (req, res) => {
    await User.sync({ force: true });
    await Post.sync({ force: true });
    await Image.sync({ force: true });

    const user1 = await User.create({
        username: faker.internet.email(),
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        password: '123',
        admin: true,
        status: 'active',
    });

    const user2 = await User.create({
        username: faker.internet.email(),
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        password: '123',
        admin: false,
        status: 'active',
    });

    const user3 = await User.create({
        username: faker.internet.email(),
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        password: '123',
        admin: false,
        status: 'inactive',
    });

    for (let i = 0; i < 10; i++) {
        const post = await Post.create({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            contacts: faker.address.streetAddress(),
            status: 'active',
            category: faker.random.arrayElement(['auto', 'real-estate', 'job', 'service']),
        });

        const user = faker.random.arrayElement([user1, user2, user3]);
        await user.addPost(post);
    }

    res.redirect('/');
});

module.exports = router;
