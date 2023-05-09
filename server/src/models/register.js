const register = (req,res) => {
    console.log("Registering user", + req.body.email);
    res.status(200);
    res.json({
        "message" : "User registered" + req.body.email
    })
}

module.exports = {
    register
}