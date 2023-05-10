const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword
    })
    try {
        await user.save();
        res.status(200).json({
            message: "User created successfully",
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message: "User not created"
        })
    }
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
   if(!await bcrypt.compare(req.body.password, user.password)){
       return res.status(400).json({
           message: "Invalid credentials"
       })
   }

const token = jwt.sign({
    _id: user._id,
},
    "secret", )


res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
})


    res.send({
        message: "Successfully logged in"
    })
})

router.get("/user", async (req, res) => {
    try {
        const cookie = req.cookies['token'];
        const claims = jwt.verify(cookie, "secret");
        if(!claims) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }
        const user = await User.findOne({_id: claims._id})
        const {password, ...data} = await user.toJSON()
        res.send(data)
    } catch (error) {
        return res.status(401).json({
            message: "Not authenticated"
        })
    }
})

router.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.send({
        message: "Logged out"
    })
})


module.exports = router;