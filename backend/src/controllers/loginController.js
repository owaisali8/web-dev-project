const { pool } = require('../config/db')
const bcrypt = require('bcryptjs')

const loginQueries = require('../data/loginQueries')
const { generateAccessToken, generateRefreshToken } = require('../auth/auth')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(404).send("Incorrect Username or Password.")
        return
    }

    const data = await pool.query(loginQueries.getUserLogin, [username])

    if (!data.rowCount) {
        res.status(404).send("Incorrect Username or Password.")
        return
    }

    const hashedDBPwd = data.rows[0].password

    if (!hashedDBPwd) {
        res.status(404).send("Incorrect Username or Password.")
        return
    }

    if (await bcrypt.compare(password, hashedDBPwd)) {
        const usertype = data.rows[0].user_type
        const user = { username: username, usertype: usertype }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
        res.status(404).send("Incorrect Username or Password.")
    }
};

const refreshUserLogin = (req, res) => {
    const { username, usertype } = req.user
    const user = { username: username, usertype: usertype }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
}

module.exports = {
    login,
    refreshUserLogin
}