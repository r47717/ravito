const Sequelize = require('sequelize');
const {createConnection} = require('../../lib/db');
const sequelize = createConnection();
const Post = require('../post');

class User extends Sequelize.Model {
    validPassword(pwd) {
        return this.password === pwd;
    }
}

User.init({
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'user'
});

User.hasMany(Post);

module.exports = User;



