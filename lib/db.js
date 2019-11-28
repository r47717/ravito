const Sequelize = require('sequelize');
const db = require('../config/db');

function createConnection() {
    return new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
    });
}

function testConnection(sequelize) {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = {
    createConnection, testConnection,
};
