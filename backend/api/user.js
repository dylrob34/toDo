var express = require('express');
const { toAsyncRouter } = require("../errorHandler");
const router = toAsyncRouter(express.Router());
var database = require("../database/data");
var auth = require("./auth");
const jwt = require('jsonwebtoken');
const User = require("../database/models/user");

router.get('/getUser', async function(req, res) {
    const user = await User.getUser(req.authData.user);
    delete user.password;
    return res.json({user});
});

router.post('/createUser', async function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email.toLowerCase();
    const pass = req.body.password;
    const passCheck = req.body.passCheck;
    try {
        const user = await User.createUser(email, pass, passCheck, firstName, lastName, true);
    } catch (error) {
        return res.json({error:true, message: error});
    }
    jwt.sign({ user: email }, process.env.secretKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            console.log("signing error");
            return res.json({error: true});
        } 
        res.cookie("jwt", token);
        return res.json({
            error: false,
            loggedIn: true,
            token
        });
    });
});

router.post("/updateUser", async (req, res) => {
    const user = req.authData.user;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const timeSetting = req.body.timeSetting;
    const showCompleted = req.body.showCompleted;

    const u = await User.getUser(user);

    const updatedUser = u.edit(firstName, lastName, gender, day, month, year, timeSetting, showCompleted);

    return res.json(updatedUser);

})


module.exports = router;