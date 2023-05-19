const { Pool, types } = require('pg')
require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_PWD = process.env.DB_PWD
const DB_PORT = process.env.DB_PORT

types.setTypeParser(1082, function (stringValue) {
    var arr = stringValue.split('-')
    stringValue = `${arr[1]}-${arr[2]}-${arr[0]}` // DD-MM-YYYY
    return stringValue;  //1082 for date type
});

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PWD,
    port: DB_PORT,
    ssl: true
});

const connectDB = () => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query('SELECT NOW()', (err, result) => {
            release()
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log("Connected to kaam_daam_db");
            console.log(result.rows)
        })
    })
}


module.exports = {
    pool,
    connectDB
};