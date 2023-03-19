const getAllEmployees = "SELECT * FROM EMPLOYEE";
const getAllEmployeesName = "SELECT USERNAME, NAME FROM EMPLOYEE";
const getEmployeeByID = "SELECT * FROM EMPLOYEE WHERE EMPLOYEE_ID = $1";
const getUnverifiedEmployees = "SELECT * FROM EMPLOYEE WHERE VERIFIED = FALSE";
const getVerifiedEmployees = "SELECT * FROM EMPLOYEE WHERE VERIFIED = TRUE";
const getEmployeeByName = "SELECT * FROM EMPLOYEE WHERE NAME LIKE $1";
const getEmployeeByUsername = 'SELECT * FROM EMPLOYEE WHERE USERNAME = $1';

const checkEmployeeByPhone = "SELECT * FROM EMPLOYEE WHERE PHONE = $1";
const checkEmployeeByEmail = "SELECT * FROM EMPLOYEE WHERE EMAIL = $1";
const checkEmployeeByCNIC = "SELECT * FROM EMPLOYEE WHERE CNIC_NO = $1";

const createEmployee =
    "INSERT INTO EMPLOYEE(EMPLOYEE_ID, USERNAME, NAME, PHONE, EMAIL, ADDRESS, DOB, GENDER, CNIC_NO, JOB_TYPE, JOIN_DATE)" +
    "VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_DATE)";

const updateEmployee = "UPDATE EMPLOYEE SET NAME = $2, PHONE = $3, EMAIL = $4, ADDRESS = $5, DOB = $6, GENDER = $7, CNIC_NO = $8, JOB_TYPE = $9 WHERE USERNAME = $1"

const deleteEmployeeByUsername = "DELETE FROM EMPLOYEE WHERE USERNAME = $1";


const getImage = "SELECT PROFILE_PIC FROM EMPLOYEE WHERE USERNAME = $1";
const updateImage = "UPDATE EMPLOYEE SET PROFILE_PIC = $1 WHERE USERNAME = $2";

const getCNIC = "SELECT CNIC_IMG FROM EMPLOYEE WHERE USERNAME = $1";
const updateCNIC = "UPDATE EMPLOYEE SET CNIC_IMG = $1 WHERE USERNAME = $2";

const changeVerification = "UPDATE EMPLOYEE SET VERIFIED = $1 WHERE USERNAME = $2";

const getRating = "SELECT RATING FROM EMPLOYEE WHERE USERNAME = $1";
const updateRating = "UPDATE EMPLOYEE SET RATING = $1 WHERE USERNAME = $2";


module.exports = {
    getAllEmployees,
    getAllEmployeesName,
    getEmployeeByID,
    getUnverifiedEmployees,
    getVerifiedEmployees,
    getEmployeeByName,
    getEmployeeByUsername,

    checkEmployeeByPhone,
    checkEmployeeByEmail,
    checkEmployeeByCNIC,

    createEmployee,

    deleteEmployeeByUsername,

    updateEmployee,

    getImage,
    updateImage,

    getCNIC,
    updateCNIC,
    changeVerification,

    getRating,
    updateRating
}