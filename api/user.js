var express = require('express');
var router = express.Router();
var database = require("../database/data");

router.post('/getUser', async function(req, res) {
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
    const result = await database.createUser(req.body.email,
        req.body.firstName,
        req.body.lastName);
    res.json({result});

    
});


module.exports = router;