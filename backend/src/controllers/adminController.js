require('dotenv').config()

const { pool } = require('../config/db')
const bcrypt = require('bcryptjs')

const adminQueries = require('../data/adminQueries')
const loginQueries = require('../data/loginQueries')

const adminValidator = require('../validators/adminValidator')
const { generateAccessToken, generateRefreshToken } = require('../auth/auth');
const { ADMIN, LOGIN_ERR_MSG, USERNAME_TAKEN_ERR, PHONE_EMAIL_ERR } = require('../config/constants');


const getAdmin = async (req, res) => {
    const id = parseInt(req.query.id);
    const phone = req.query.phone;
    if (id) {
        const result = await pool.query(adminQueries.getAdminByID, [id]);
        const data = result.rows
        return res.status(200).json(data);
    } else if (phone) {
        const result = await pool.query(adminQueries.getAdminByPhone, [phone]);
        const data = result.rows
        return res.status(200).json(data);
    } else {
        pool.query(adminQueries.getAllAdmins, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            }

            const data = result.rows
            res.status(200).json(data)
        })
    }
}

const getAdminNames = async (req, res) => {
    const result = await pool.query(adminQueries.getAllAdminsNames)

    const data = result.rows;
    res.status(200).json(data)
}

const getAdminByUsername = (req, res) => {
    const username = req.params.username;
    pool.query(adminQueries.getAdminByUsername, [username], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        }

        const data = result.rows[0]
        if (!data) res.sendStatus(404)

        res.status(200).json(data)
    })
}

const getAdminById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(adminQueries.getAdminByID, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        }

        const data = result.rows[0]
        if (!data) res.status(404).json(null)

        res.status(200).json(data)
    })
}

const getAdminByName = (req, res) => {
    const name = req.query.name;
    if (!name) {
        res.status(400).json(null)
        return
    }
    pool.query(adminQueries.getAdminByName, ['%' + name + '%'], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        }

        const data = result.rows
        if (!result.rowCount) {
            res.status(404).json(null)
            return
        }

        res.status(200).json(data)
    })
}

const deleteAdminByUsername = async (req, res) => {
    const username = req.params.username
    if (!username) return res.status(400).send()
    pool.query(adminQueries.getAdminByUsername, [username], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send()
        }

        if (!result.rowCount) {
            res.status(404).json(null)
            return
        }

        const data = result.rows[0]

        if (!data) {
            res.status(404).json(null)
            return
        }

        pool.query(loginQueries.deleteUser, [username], (err) => {
            if (err) {
                console.log(err)
                res.status(500).send()
                return
            }
        })

        res.status(200).send()
    });

}

const loginAdmin = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(404).send(LOGIN_ERR_MSG);
        return
    }

    const data = await pool.query(loginQueries.getUserPassword, [username])

    if (!data.rowCount) {
        res.status(404).send(LOGIN_ERR_MSG);
        return
    }

    const hashedDBPwd = data.rows[0].password

    if (!hashedDBPwd) {
        res.status(404).send(LOGIN_ERR_MSG);
        return
    }

    if (await bcrypt.compare(password, hashedDBPwd)) {
        const user = { username: username, usertype: ADMIN }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
        res.status(404).send(LOGIN_ERR_MSG);
    }
}

const signUpAdmin = async (req, res) => {
    const { error } = adminValidator.adminSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const { username, password, name, phone, email, address, dob, gender } = req.body

    const data = await pool.query(loginQueries.getUserLogin, [username]);

    if (data.rowCount) {
        res.status(400).send(USERNAME_TAKEN_ERR);
        return
    }

    const phoneDB = await pool.query(adminQueries.checkAdminByPhone, [phone])
    const emailDB = await pool.query(adminQueries.checkAdminByEmail, [email])

    if (phoneDB.rowCount || emailDB.rowCount) {
        res.status(400).send(PHONE_EMAIL_ERR)
        return
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    await pool.query(loginQueries.createAdminLogin, [username, hashedPwd], (err) => {
        if (err) {
            console.error(err)
            res.status(500).send()
            return
        }
    });

    await pool.query(adminQueries.createAdmin, [username, name, phone, email, address, dob, gender], (err) => {
        if (err) {
            console.log(err)
            res.status(500).send()
            return
        }
    });

    res.status(201).send()
}

const refreshAdminToken = (req, res) => {
    const { username, usertype } = req.user
    const user = { username: username, usertype: usertype }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
}

const updateAdmin = async (req, res) => {
    const username = req.params.username
    if (!username) res.status(400).send()

    if (req.user.username != username) {
        return res.sendStatus(403)
    }

    const { error } = adminValidator.adminUpdateSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const data = await pool.query(loginQueries.getUserLogin, [username])

    if (!data.rowCount) {
        return res.sendStatus(404)
    }

    const { name, phone, email, address, dob, gender } = req.body

    const phoneDB = await pool.query(adminQueries.checkAdminByPhone, [phone])
    const emailDB = await pool.query(adminQueries.checkAdminByEmail, [email])

    if (phoneDB.rowCount) {
        if (phone != phoneDB.rows[0].phone) {
            return res.status(400).send(PHONE_EMAIL_ERR)
        }
    }

    if (emailDB.rowCount) {
        if (email != emailDB.rows[0].email) {
            return res.status(400).send(PHONE_EMAIL_ERR)
        }
    }

    pool.query(adminQueries.updateAdmin, [username, name, phone, email, address, dob, gender], (err, res) => {
        if (err) {
            console.error(err)
            return res.status(500).send()
        }
    })

    res.sendStatus(201)

}

const updateAdminPwd = async (req, res) => {
    const { error } = adminValidator.adminUpdatePwdSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const { username, oldPassword, newPassword } = req.body

    if (req.user.username != username) {
        return res.sendStatus(403)
    }

    const data = await pool.query(loginQueries.getUserLogin, [username])

    if (!data.rowCount) {
        return res.sendStatus(404)
    }

    const hashedDBPwd = data.rows[0].password

    if (!await bcrypt.compare(oldPassword, hashedDBPwd)) {
        return res.status(404).send(LOGIN_ERR_MSG)
    }

    const newhashedPwd = await bcrypt.hash(newPassword, 10)

    pool.query(loginQueries.updatePwd, [newhashedPwd, username], (err, res) => {
        if (err) {
            return res.sendStatus(500)
        }
    })

    res.sendStatus(201);

}


const uploadImage = async (req, res) => {
    const username = req.params.username
    if (!username) return res.sendStatus(400)
    if (!req.files) return res.sendStatus(400)

    if (req.user.username != username) {
        return res.sendStatus(403)
    }

    const image = req.files.image.data;

    if (!image) return res.sendStatus(400)
    try {
        await pool.query(adminQueries.updateImage, [image, username]);
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

const getImage = async (req, res) => {
    const username = req.params.username
    if (!username) return res.sendStatus(400)

    try {
        const result = await pool.query(adminQueries.getImage, [username]);
        res.setHeader('Content-Type', 'image/png')
        res.status(200).send(result.rows[0].profile_pic)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

module.exports = {
    getAdmin,
    getAdminNames,
    getAdminByUsername,
    getAdminById,
    getAdminByName,
    getImage,

    deleteAdminByUsername,

    loginAdmin,
    signUpAdmin,
    refreshAdminToken,

    updateAdmin,
    updateAdminPwd,
    uploadImage
}