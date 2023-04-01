const Sequelize = require('sequelize');
// your credentials
const database = new Sequelize('kaam_daam_db', 'postgres', '1204', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433
});

const connectORM = async () => {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectORM()
module.exports = database;