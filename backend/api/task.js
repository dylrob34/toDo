var express = require('express');
var router = express.Router();
var database = require("../database/data");
var auth = require("./auth");
const Task = require("../database/models/task");

router.get('/getTasks', auth.verifyToken, async function(req, res) {
    const tasks = await database.getTasks(req.authData.user);
    return res.json({tasks});
});

router.post('/createTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const title = req.body.title;
    const body = req.body.body;

    const task = await Task.createTask(user, title, body);
    return res.json({error: false});
});

router.post('/editTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const taskId = req.body.id
    const title = req.body.title;
    const body = req.body.body;
    const task = await Task.getTask(taskId);
    if (task.user == user) {
        await task.editTask(title, body);
        return res.json({error:false});
    } else {
        return res.json({error: true});
    }
});

router.post('/deleteTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const taskId = req.body.id;
    const task = await Task.getTask(taskId);
    if (task.user == user) {
        await task.deleteTask(taskId);
        return res.json({error: false});
    } else {
        return res.json({error: true});
    }
});

module.exports = router;