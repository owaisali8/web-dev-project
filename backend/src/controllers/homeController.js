
const documentation = "Kaam Daam API Documentation\n" +
    "/admin: For Admin\n/login: For User Login\n/employer: For Employer\n/employee: For Employee\n/jobs: For Jobs"

const getHomePage = (req, res) => {
    res.status(200).send(documentation);
}

module.exports = {
    getHomePage
}