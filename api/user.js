var express = require('express');
var router = express.Router();
var database = require("../database/data");
var auth = require("./auth");

router.post('/getUser', auth.verifyToken, async function(req, res) {
    const user = await database.getUser(req.body.email);
    res.json({user});
});

router.post('/createUser', async function(req, res) {
    const email = req.body.email;
    if (typeof email === 'undefined')
    {
        res.json({
            error: true,
            message: "Email Cannot be Null"
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