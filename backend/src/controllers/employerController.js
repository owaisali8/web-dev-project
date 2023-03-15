const { pool } = require('../config/db')

const employerQueries = require('../data/employerQueries')
const loginQueries = require('../data/loginQueries')

const bcrypt = require('bcryptjs')
const employerValidator = require('../validators/employerValidator')


const getEmployer = async (req, res) => {
    try {
        const result = await pool.query(employerQueries.getAllEmployers)
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getEmployerNames = async (req, res) => {
    try {
        const result = await pool.query(employerQueries.getAllEmployersName)
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getEmployerById = async (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(employerQueries.getEmployerByID, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        }

        const data = result.rows[0]
        if (!data) res.status(404).json(null)

        res.status(200).json(data)
    })
}

const getEmployerByName = async (req, res) => {
    const name = req.query.name;
    if (!name) {
        res.status(400).json(null)
        return
    }
    pool.query(employerQueries.getEmployerByName, ['%' + name + '%'], (err, result) => {
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

const getEmployerByUsername = async (req, res) => {
    const username = req.params.username;
    pool.query(employerQueries.getEmployerByUsername, [username], (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }

        const data = result.rows[0]
        if (!data) res.sendStatus(404)

        res.status(200).json(data)
    })
}

const deleteEmployerByUsername = async (req, res) => {
    const username = req.params.username
    if (!username) return res.sendStatus(400)
    if (req.user.username != username) return res.sendStatus(403);
    pool.query(employerQueries.getEmployerByUsername, [username], (err, result) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        if (!result.rowCount) {
            return res.status(404).json(null) 
        }

        const data = result.rows[0]

        if (!data) {
            return res.status(404).json(null)
        }

        pool.query(employerQueries.deleteEmployerByUsername, [username], (err) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }

        });

        pool.query(loginQueries.deleteUser, [username], (err) => {if (err) console.error(err)})
    });

    res.sendStatus(200)
}

const signUpEmployer = async (req, res) => {
    const { error } = employerValidator.employerSchema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const { username, password, name, phone, email, address, dob, gender } = req.body

    const data = await pool.query(loginQueries.getUserLogin, [username]);

    if (data.rowCount) {
        return res.status(400).send("Username is already taken.")
    }

    const phoneDB = await pool.query(employerQueries.checkEmployerByPhone, [phone])
    const emailDB = await pool.query(employerQueries.checkEmployerByEmail, [email])

    if (phoneDB.rowCount || emailDB.rowCount) {
        return res.status(400).send("Phone or Email is already in use.")
    }

    const hashedPwd = await bcrypt.hash(password, 10)

    await pool.query(loginQueries.createEmployerLogin, [username, hashedPwd], (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send()
        }
    });

    await pool.query(employerQueries.createEmployer, [username, name, phone, email, address, dob, gender], (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send()            
        }
    });

    res.sendStatus(201)
}

const updateEmployerPwd = async (req, res) => {
    const { error } = employerValidator.employerUpdatePwdSchema.validate(req.body)

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
        return res.status(404).send("Incorrect Username or Password.")
    }

    const newhashedPwd = await bcrypt.hash(newPassword, 10)

    pool.query(loginQueries.updatePwd, [newhashedPwd, username], (err, res) => {
        if (err) {
            return res.sendStatus(500)
        }
    })

    res.sendStatus(201);

}

const updateEmployer = async (req, res) => {
    const username = req.params.username
    if (!username) res.sendStatus(400)

    if (req.user.username != username) {
        return res.sendStatus(403)
    }

    const { error } = employerValidator.employerUpdateSchema.validate(req.body)
    
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const data = await pool.query(loginQueries.getUserLogin, [username])

    if (!data.rowCount) {
        return res.sendStatus(404)
    }

    const { name, phone, email, address, dob, gender } = req.body

    const phoneDB = await pool.query(employerQueries.checkEmployerByPhone, [phone])
    const emailDB = await pool.query(employerQueries.checkEmployerByEmail, [email])

    if (phoneDB.rowCount) {
        if (phone != phoneDB.rows[0].phone) {
            return res.status(400).send("Phone or Email is already in use.")
        }
    }

    if (emailDB.rowCount) {
        if (email != emailDB.rows[0].email) {
            return res.status(400).send("Phone or Email is already in use.")
        }
    }

    pool.query(employerQueries.updateEmployer, [username, name, phone, email, address, dob, gender], (err, res) => {
        if (err) {
            console.error(err)
            return res.status(500).send()
        }
    })

    res.sendStatus(201)

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
        await pool.query(employerQueries.updateImage, [image, username]);
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
        const result = await pool.query(employerQueries.getImage, [username]);
        res.setHeader('Content-Type', 'image/png')
        res.status(200).send(result.rows[0].profile_pic)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}




module.exports = {
    getEmployer,
    getEmployerNames,
    getEmployerById,
    getEmployerByName,
    getEmployerByUsername,

    deleteEmployerByUsername,

    signUpEmployer,

    updateEmployerPwd,
    updateEmployer,

    uploadImage,
    getImage
}