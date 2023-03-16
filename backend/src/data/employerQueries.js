const getAllEmployers = "SELECT * FROM EMPLOYER";
const getAllEmployersName = "SELECT USERNAME, NAME FROM EMPLOYER";
const getEmployerByID = "SELECT * FROM EMPLOYER WHERE EMPLOYER_ID = $1"
const getEmployerByUsername = 'SELECT * FROM EMPLOYER WHERE USERNAME = $1';
const getEmployerByName = "SELECT * FROM EMPLOYER WHERE NAME LIKE $1";
const checkEmployerByPhone = "SELECT * FROM EMPLOYER WHERE PHONE = $1";
const checkEmployerByEmail = "SELECT * FROM EMPLOYER WHERE EMAIL = $1";
const getImage = "SELECT PROFILE_PIC FROM EMPLOYER WHERE USERNAME = $1"

const deleteEmployerByUsername = "DELETE FROM EMPLOYER WHERE USERNAME = $1";

const createEmployer = "INSERT INTO EMPLOYER(EMPLOYER_ID, USERNAME, NAME, PHONE, EMAIL, ADDRESS, DOB, GENDER, JOIN_DATE)" +
    "VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, CURRENT_DATE)";

const updateEmployer = "UPDATE EMPLOYER SET NAME = $2, PHONE = $3, EMAIL = $4, ADDRESS = $5, DOB = $6, GENDER = $7 WHERE USERNAME = $1"

const updateImage = "UPDATE EMPLOYER SET PROFILE_PIC = $1 WHERE USERNAME = $2"

const getIdFromUsername = "SELECT EMPLOYER_ID FROM EMPLOYER WHERE USERNAME = $1"

module.exports = {
    getAllEmployers,
    getAllEmployersName,
    getEmployerByID,
    getEmployerByUsername,
    getEmployerByName,
    checkEmployerByPhone,
    checkEmployerByEmail,
    getImage,

    deleteEmployerByUsername,

    createEmployer,

    updateEmployer,
    updateImage,

    getIdFromUsername
}