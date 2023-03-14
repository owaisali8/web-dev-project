const getUserLogin = "SELECT * FROM LOGIN WHERE USERNAME = $1"
const getUserPassword = "SELECT PASSWORD FROM LOGIN WHERE USERNAME = $1"

const createLogin = "INSERT INTO LOGIN(USERNAME, PASSWORD, USER_TYPE) VALUES ($1, $2, $3)"
const createAdminLogin = "INSERT INTO LOGIN(USERNAME, PASSWORD, USER_TYPE) VALUES ($1, $2, 'ADMIN')"
const createEmployerLogin = "INSERT INTO LOGIN(USERNAME, PASSWORD, USER_TYPE) VALUES ($1, $2, 'EMPLOYER')"
const createEmployeeLogin = "INSERT INTO LOGIN(USERNAME, PASSWORD, USER_TYPE) VALUES ($1, $2, 'EMPLOYEE')"

const updatePwd = "UPDATE LOGIN SET PASSWORD = $1 WHERE USERNAME = $2"

const deleteUser = "DELETE FROM LOGIN WHERE USERNAME = $1"


module.exports = {
    getUserLogin,
    getUserPassword,

    deleteUser,

    createLogin,
    createAdminLogin,
    createEmployerLogin,
    createEmployeeLogin,

    updatePwd
}