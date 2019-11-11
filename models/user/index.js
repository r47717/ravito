const Sequelize = require('sequelize');
const { createConnection } = require('../../lib/db');
const sequelize = createConnection();

class User extends Sequelize.Model {
}

User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'user'
    // options
});


module.exports = User;

// await User.sync({ force: true });
// await User.create({
//   name: 'Mike',
// });

