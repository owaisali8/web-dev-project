const Sequelize = require('sequelize');
const database = require('../config/orm');

const Login = database.define(
    'login',
    {
        username: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        password: {
            type: Sequelize.TEXT
        },
        user_type: {
            type: Sequelize.TEXT
        }
    },
    { timestamps: false, tableName: 'login', freezeTablename: true}
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