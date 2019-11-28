const express = require('express');

const router = express.Router();
const csrfMiddleware = require('csurf')({ cookie: true });
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const randomstring = require('randomstring');
const passport = require('../lib/passport');
const Post = require('../models/post');
const Image = require('../models/image');

router.get('/', async (req, res, next) => {
    const posts = await Post.findAll();
    for (const post of posts) {
        post.images = await post.getImages();
    }
    res.render('index', { posts });
});

router.get('/posts/category/:category', async (req, res, next) => {
    const { params: { category } } = req;

    if (Post.categoryNames[category] === undefined) {
        return next();
    }

    const posts = await Post.findAll({
        where: {
            category,
        },
    });
    for (const post of posts) {
        post.images = await post.getImages();
    }
    res.render('index', {
        posts,
        category: Post.categoryNames[category],
    });
});

router.get('/posts/my', csrfMiddleware, passport.protectRoute, async (req, res, next) => {
    const posts = await req.user.getPosts();
    for (const post of posts) {
        post.images = await post.getImages();
    }
    console.log(posts);
    res.render('index', { posts });
});

router.get('/posts/new', csrfMiddleware, passport.protectRoute, async (req, res, next) => {
    res.render('newpost', { csrfToken: req.csrfToken(), categories: JSON.stringify(Post.categoryNames) });
});

router.post('/posts', csrfMiddleware, passport.protectRoute, async (req, res) => {
    const {
        title, description, contacts, category,
    } = req.body;

    const NN = 6; // max images to upload
    const images = [];
    for (let i = 1; i <= NN; i++) {
        const obj = req.files[`file${i}`];
        if (obj) {
            const filename = randomstring.generate();
            obj.mv(path.resolve(__dirname, '../public/uploads', filename));

            const image = await Image.create({
                title: obj.name,
                filename,
                description: null,
            });

            images.push(image);
        }
    }

    const post = await Post.create({
        title, description, contacts, category,
    });
    await req.user.addPost(post);

    for (const image of images) {
        await post.addImage(image);
    }

    res.redirect('/');
});

// GraphQL for advanced post queries

const schema = buildSchema(`
  type Query {
    posts(id: Int, category: String, status: String): [Post]
  }
  
  type Post {
    id: Int
    title: String
    description: String
    contacts: String
    status: String
    category: String
  }
`);

const root = {
    posts: async ({ id, category, status }) => {
        const where = {};

        (typeof id === 'number') && (where.id = id);
        (typeof category === 'string') && (where.category = category);
        (typeof status === 'string') && (where.status = status);

        return Post.findAll({ where });
    },
};

router.use('/posts/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

// queries:

const example = `
{
  posts(id: 6, status: "active") {
    id
    title
    description
    status
    category
    contacts
  }
}
`;


module.exports = router;
