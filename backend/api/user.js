var express = require('express');
var router = express.Router();
var database = require("../database/data");
var auth = require("./auth");
const jwt = require('jsonwebtoken');

router.get('/getUser', auth.verifyToken, async function(req, res) {
    const user = await database.getUser(req.authData.user);
    res.json({user});
});

router.post('/createUser', async function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pass = req.body.password;
    const passCheck = req.body.passCheck;


    if (typeof email === 'undefined' || email === '')
    {
        res.json({
            error: true
        })
    }
    if (typeof firstName === 'undefined' || firstName === '')
    {
        res.json({
            error: true
        })
    }
    if (typeof lastName === 'undefined' || lastName === '')
    {
        res.json({
            error: true
        })
    }
    if (typeof pass === 'undefined' || passCheck === 'undefined' || pass.length < 4 || pass !== passCheck)
    {
        res.json({
            error: true
        })
    }
    const hash = await auth.hashPassword(pass);
    const result = await database.createUser(
        req.body.email,
        hash,
        req.body.firstName,
        req.body.lastName);

    jwt.sign({ user: email }, process.env.secretKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            console.log("signing error");
            res.json({error: true});
        } 
        res.cookie("jwt", token);
        res.json({
            error: false,
            loggedIn: true,
            token
        });
    });

    
});


module.exports = router;