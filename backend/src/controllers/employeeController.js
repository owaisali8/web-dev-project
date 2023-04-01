const { pool } = require('../config/db')

const employeeQueries = require('../data/employeeQueries')
const loginQueries = require('../data/loginQueries')

const bcrypt = require('bcryptjs')
const employeeValidator = require('../validators/employeeValidator')
const { USERNAME_TAKEN_ERR, PHONE_EMAIL_ERR, LOGIN_ERR_MSG } = require('../config/constants')

const getEmployee = async (req, res) => {
    const id = parseInt(req.query.id);
    const phone = req.query.phone;
    if (id) {
        const result = await pool.query(employeeQueries.getEmployeeByID, [id]);
        const data = result.rows
        return res.status(200).json(data);
    } else if (phone) {
        const result = await pool.query(employeeQueries.getEmployeeByPhone, [phone]);
        const data = result.rows
        return res.status(200).json(data);
    }
    
    try {
        const result = await pool.query(employeeQueries.getAllEmployees)
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getEmployeeNames = async (req, res) => {
    try {
        const result = await pool.query(employeeQueries.getAllEmployeesName)
        const data = result.rows
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}


const getEmployeeById = async (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(employeeQueries.getEmployeeByID, [id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        }

        const data = result.rows[0]
        if (!data) res.status(404).json(null)

        res.status(200).json(data)
    })
}

const getUnverifiedEmployees = async (req, res) => {
    try {
        const result = await pool.query(employeeQueries.getUnverifiedEmployees)
        res.status(200).json(result.rows)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getVerifiedEmployees = async (req, res) => {
    try {
        const result = await pool.query(employeeQueries.getVerifiedEmployees)
        res.status(200).json(result.rows)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const getEmployeeByName = async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json(null)
    }
    pool.query(employeeQueries.getEmployeeByName, ['%' + name + '%'], (err, result) => {
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

const getEmployeeByUsername = async (req, res) => {
    const username = req.params.username;
    pool.query(employeeQueries.getEmployeeByUsername, [username], (err, result) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }

        const data = result.rows[0]
        if (!data) res.sendStatus(404)

        res.status(200).json(data)
    })
}

const deleteEmployeeByUsername = async (req, res) => {
    const username = req.params.username
    if (!username) return res.sendStatus(400)
    if (req.user.username != username) return res.sendStatus(403);
    pool.query(employeeQueries.getEmployeeByUsername, [username], (err, result) => {
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

        pool.query(loginQueries.deleteUser, [username], (err) => { if (err) console.error(err) })
    });

    res.sendStatus(200)
}


const signUpEmployee = async (req, res) => {
    const { error } = employeeValidator.employeeSchema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const { username, password, name, phone, email, address, dob, gender, cnic_no, job_type } = req.body

    const data = await pool.query(loginQueries.getUserLogin, [username]);

    if (data.rowCount) {
        return res.status(400).send(USERNAME_TAKEN_ERR)
    }

    const phoneDB = await pool.query(employeeQueries.checkEmployeeByPhone, [phone])
    const emailDB = await pool.query(employeeQueries.checkEmployeeByEmail, [email])

    if (phoneDB.rowCount || emailDB.rowCount) {
        return res.status(400).send(PHONE_EMAIL_ERR)
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10)

        await pool.query(loginQueries.createEmployeeLogin, [username, hashedPwd]);

        await pool.query(employeeQueries.createEmployee,
            [username, name, phone, email, address, dob, gender, cnic_no, job_type]);

        res.sendStatus(201)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}


const updateEmployeePwd = async (req, res) => {
    const { error } = employeeValidator.employeeUpdatePwdSchema.validate(req.body)

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


const updateEmployee = async (req, res) => {
    const username = req.params.username
    if (!username) res.sendStatus(400)

    if (req.user.username != username) {
        return res.sendStatus(403)
    }

    const { error } = employeeValidator.employeeUpdateSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const data = await pool.query(loginQueries.getUserLogin, [username])

    if (!data.rowCount) {
        return res.sendStatus(404)
    }

    const { name, phone, email, address, dob, gender, cnic_no, job_type } = req.body

    const phoneDB = await pool.query(employeeQueries.checkEmployeeByPhone, [phone])
    const emailDB = await pool.query(employeeQueries.checkEmployeeByEmail, [email])
    const cnicDB = await pool.query(employeeQueries.checkEmployeeByCNIC, [cnic_no])


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

    if (cnicDB.rowCount) {
        if (cnic_no != cnicDB.rows[0].cnic_no) {
            return res.status(400).send("CNIC is already in use.")
        }
    }

    pool.query(employeeQueries.updateEmployee, [username, name, phone, email, address, dob, gender, cnic_no, job_type], (err, res) => {
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

    if (req.files.image.name.endsWith(".png") || req.files.image.name.endsWith(".jpg")) {
        const image = req.files.image.data;

        if (!image) return res.sendStatus(400)
        try {
            await pool.query(employeeQueries.updateImage, [image, username]);
            res.sendStatus(201)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(400);
    }

}

const getImage = async (req, res) => {
    const username = req.params.username
    if (!username) return res.sendStatus(400)

    try {
        const result = await pool.query(employeeQueries.getImage, [username]);
        res.setHeader('Content-Type', 'image/png')
        res.status(200).send(result.rows[0].profile_pic)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}


const uploadCNIC = async (req, res) => {
    const username = req.params.username
    if (!username) return res.sendStatus(400)
    if (!req.files) return res.sendStatus(400)

    if (req.user.username != username) {
        return res.sendStatus(403)
    }

    if (req.files.image.name.endsWith(".png") || req.files.image.name.endsWith(".jpg")) {

        const image = req.files.image.data;

        if (!image) return res.sendStatus(400)
        try {
            await pool.query(employeeQueries.updateCNIC, [image, username]);
            res.sendStatus(201)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    } else {
        return res.status(400).send("PNG only")
    }

}

const getCNIC = async (req, res) => {
    const username = req.params.username
    if (!username) return res.sendStatus(400)

    try {
        const result = await pool.query(employeeQueries.getCNIC, [username]);
        res.setHeader('Content-Type', 'image/png')
        res.status(200).send(result.rows[0].cnic_img)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

const changeVerification = async (req, res) => {
    const { username, verified } = req.body;
    if (!username) return res.sendStatus(400);
    if (verified == null) return res.sendStatus(400);

    try {
        await pool.query(employeeQueries.changeVerification, [verified, username])
        res.sendStatus(201);
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

const updateRating = async (req, res) => {
    const { username, rating } = req.body;
    if (!username) return res.sendStatus(400);
    if (!rating) return res.sendStatus(400)
    const rating_float = parseFloat(rating)
    if (rating_float >= 5 || rating_float <= 0) return res.status(400).send("Invalid Rating")

    try {
        const result = await pool.query(employeeQueries.getRating, [username])
        if (!result.rowCount) {
            return res.sendStatus(404);
        }

        const db_rating = result.rows[0].rating

        const new_rating = (db_rating + rating) / 2

        await pool.query(employeeQueries.updateRating, [new_rating, username])

        res.sendStatus(200)

    }
    catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}



module.exports = {
    getEmployee,
    getEmployeeNames,
    getEmployeeById,
    getUnverifiedEmployees,
    getVerifiedEmployees,
    getEmployeeByName,
    getEmployeeByUsername,

    signUpEmployee,

    updateEmployeePwd,
    updateEmployee,

    deleteEmployeeByUsername,

    uploadImage,
    getImage,

    uploadCNIC,
    getCNIC,
    changeVerification,

    updateRating
}