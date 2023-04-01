const Sequelize = require('sequelize');
const database = require('../config/orm');

const Login = database.define(
    'Login',
    {
        username: {
            type: Sequelize.TEXT
        },
        password: {
            type: Sequelize.TEXT
        },
        user_type: {
            type: Sequelize.TEXT
        }
    },
    { timestamps: false, tableName: 'Login' }
);

Login.readAll = async (req, res) => {
    try {
        const users = await Login.findAll({
            attributes: ['username', 'user_type']
        });

        return res.send({ users });
    } catch (error) {
        return res.send(error);
    }
};

module.exports = Login;