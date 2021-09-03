var express = require('express');
var router = express.Router();
var database = require("../database/data");
var auth = require("./auth");

router.get('/getTasks', auth.verifyToken, async function(req, res) {
    const tasks = await database.getTasks(req.authData.user);
    return res.json({tasks});
});

router.post('/createTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const title = req.body.title;
    const body = req.body.body;

    const result = await database.createTask(user, title, body);
    if (result) { // idk if this will be false on failure
        return res.json({error: false});
    } else {
        return res.json({error: true})
    }
});

router.post('/editTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const taskId = req.body.id
    const title = req.body.title;
    const body = req.body.body;

    const task = await database.getTask(taskId);
    if (task.user == user) {
        await database.updateTask(taskId, user, title, body);
        return res.json({error:false});
    } else {
        return res.json({error: true});
    }
});

router.post('/deleteTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const taskId = req.body.id;
    const task = await database.getTask(taskId);
    if (task.user == user) {
        await database.deleteTask(taskId);
        return res.json({error: false});
    } else {
        return res.json({error: true});
    }
});

module.exports = router;