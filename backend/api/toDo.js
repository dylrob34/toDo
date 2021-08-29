var express = require('express');
var router = express.Router();
var database = require("../database/data");
var auth = require("./auth");

router.get('/getToDos', auth.verifyToken, async function(req, res) {
    const toDos = await database.getToDos(req.authData.user);
    return res.json({toDos});
});

router.post('/createToDo', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const title = req.body.title;
    const body = req.body.body;

    const result = await database.createToDo(user, title, body);
    if (result) { // idk if this will be false on failure
        return res.json({error: false});
    } else {
        return res.json({error: true})
    }
})

module.exports = router;