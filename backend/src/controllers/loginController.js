

function login(req, res) {
    const username = req.body.username
    const password = req.body.password

    if(username == null || password == null){
        res.status(400).send("Enter Conrrect ID and Password")
    }

    res.send(`${username}\n${password}`);
}

module.exports = {
    login
}