var express = require('express');
var router = express.Router();
var database = require("../database/data");
var auth = require("./auth");

router.get('/getUser', auth.verifyToken, async function(req, res) {
    const user = await database.getUser(req.authData.user);
    res.json({user});
});

router.post('/createUser', async function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pass = req.body.password;
    const passCheck = req.body.password;


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
    const hash = await auth.hashPassword(req.body.password);
    const result = await database.createUser(
        req.body.email,
        hash,
        req.body.firstName,
        req.body.lastName);
    res.json({result});

    
});


module.exports = router;