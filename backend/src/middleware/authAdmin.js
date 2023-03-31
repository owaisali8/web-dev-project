require('dotenv').config()
const { ADMIN } = require('../config/constants');
const jwt = require('jsonwebtoken')

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        if (user.usertype != ADMIN) {
            return res.sendStatus(403)
        }

        req.user = user
        next();
    })
}

const authenticateAdminRefresh = (req, res, next) => {
    const token = req.body.refreshToken

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        if (user.usertype != ADMIN) {
            return res.sendStatus(403)
        }
        req.user = user
        next();
    })
}

module.exports = {
    authenticateAdmin,
    authenticateAdminRefresh
}