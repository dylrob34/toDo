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

    const result = database.createToDo(user, title, body);
    return res.json({result})
})

module.exports = router;