const { Pool, types } = require('pg')

types.setTypeParser(1082, function (stringValue) {
    var arr = stringValue.split('-')
    stringValue = `${arr[1]}-${arr[2]}-${arr[0]}` // DD-MM-YYYY
    return stringValue;  //1082 for date type
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kaam_daam_db',
    password: '1204',
    port: 5433
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