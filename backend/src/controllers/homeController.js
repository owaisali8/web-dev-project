
const documentation = "Kaam Daam API Documentation\n" +
    "/admin: For Admin\n/login: For User Login\n"

const getHomePage = (req, res) => {
    res.status(200).send(documentation);
}

module.exports = {
    getHomePage
}