const getAllAdmins = "SELECT * FROM ADMIN";
const getAllAdminsNames = "SELECT USERNAME, NAME FROM ADMIN";
const getAdminByUsername = 'SELECT * FROM ADMIN WHERE USERNAME = $1';
const getAdminByID = 'SELECT * FROM ADMIN WHERE ADMIN_ID = $1';
const getAdminByName = "SELECT * FROM ADMIN WHERE NAME LIKE $1"
const getImage = "SELECT PROFILE_PIC FROM ADMIN WHERE USERNAME = $1"

const checkAdminByPhone = "SELECT * FROM ADMIN WHERE PHONE = $1"
const checkAdminByEmail = "SELECT * FROM ADMIN WHERE EMAIL = $1"

const deleteAdminByUsername = "DELETE FROM ADMIN WHERE USERNAME = $1";

const createAdmin = "INSERT INTO ADMIN(ADMIN_ID, USERNAME, NAME, PHONE, EMAIL, ADDRESS, DOB, GENDER, JOIN_DATE)" +
    "VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, CURRENT_DATE)"

const updateAdmin = "UPDATE ADMIN SET NAME = $2, PHONE = $3, EMAIL = $4, ADDRESS = $5, DOB = $6, GENDER = $7 WHERE USERNAME = $1"

const updateImage = "UPDATE ADMIN SET PROFILE_PIC = $1 WHERE USERNAME = $2"

module.exports = {
    getAllAdmins,
    getAllAdminsNames,
    getAdminByID,
    getAdminByUsername,
    getAdminByName,
    getImage,
    checkAdminByPhone,
    checkAdminByEmail,

    deleteAdminByUsername,

    createAdmin,

    updateAdmin,
    updateImage
};