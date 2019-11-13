const Sequelize = require('sequelize');
const {createConnection} = require('../../lib/db');
const sequelize = createConnection();
const Post = require('../post');

class Image extends Sequelize.Model {
}

Image.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data: {
        type: Sequelize.BLOB,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'image'
});

module.exports = Image;
