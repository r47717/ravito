const express = require('express');
const router = express.Router();
const csrfMiddleware = require('csurf')({ cookie: true });
const Post = require('../models/post');
const passport = require('../lib/passport');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

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

router.post('/posts', csrfMiddleware, passport.protectRoute, async function(req, res) {
    const {title, description, contacts, category} = req.body;
    const post = await Post.create({
        title, description, contacts, category
    });
    await req.user.addPost(post);
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
    posts: async ({id, category, status}) => {
        const where = {};

        (typeof id === 'number') && (where['id'] = id);
        (typeof category === 'string') && (where["category"] = category);
        (typeof status === 'string') && (where["status"] = status);

        return await Post.findAll({ where });
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
