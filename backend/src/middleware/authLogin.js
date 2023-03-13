require('dotenv').config()
const jwt = require('jsonwebtoken')

const authUserRefresh = (req, res, next) => {
    const token = req.body.refreshToken

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        if (user.usertype == 'ADMIN') {
            return res.sendStatus(403)
        }
        req.user = user
        next();
    })
}

module.exports = authUserRefresh