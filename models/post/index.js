const Sequelize = require('sequelize');
const {createConnection} = require('../../lib/db');
const sequelize = createConnection();
const User = require('../user');
const Image = require('../image');

class Post extends Sequelize.Model {
}

Post.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    contacts: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'post'
    // options
});

Post.categoryNames = {
    'auto': "Авто",
    'real-estate': "Недвижимость",
    'job': 'Работа',
    'service': 'Услуги'
};

Post.hasMany(Image);

module.exports = Post;



