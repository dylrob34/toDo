var express = require('express');
var router = express.Router();
var database = require("../database/data");
var auth = require("./auth");
const Task = require("../database/models/task");
const Team = require("../database/models/teams");
const Bucket = require("../database/models/buckets");
const Owner = require("../database/models/owner");

router.get('/getTasks', auth.verifyToken, async function(req, res) {
    const tasks = await Task.getTasks(req.authData.user);
    return res.json({tasks});
});

router.post("/getTeamTasks", auth.verifyToken, async (req, res) => {
    const tasks = await database.getTasks(req.body.team);
    return res.json({tasks});
})

router.post('/createTask', auth.verifyToken, async function(req, res) {
    const assignees = [];
    const title = req.body.title;
    const body = req.body.body;

    const task = await Task.createTask(req.body.team || req.authData.user, assignees, title, body);
    
    return res.json({error: false});
});

router.post('/editTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const taskId = req.body.id;
    const assignees = req.body.assignees;
    const title = req.body.title;
    const body = req.body.body;
    const complete = req.body.complete;
    const task = await Task.getTask(taskId);
    if (task.team != undefined) {
        const team = await Team.getTeam(task.team);
        if (team.owner == user || team.admins.includes(user) || team.users.includes(user)) {
            await task.editTask(assignees, title, body, complete);
            return res.json({error: false});
        }
    }
    if (task.user == user) {
        await task.editTask(assignees, title, body, complete);
        return res.json({error:false});
    }
    return res.json({error: true});
});

router.post('/deleteTask', auth.verifyToken, async function(req, res) {
    const user = req.authData.user;
    const taskId = req.body.id;
    const task = await Task.getTask(taskId);
    const owner = await Owner.getOwner(task.owner);
    if (task.owner === user) {
        await task.deleteTask();
        return res.json({error: false});
    } else if (owner !== null) {
        if (owner.owner === user || owner.admins.includes(user) || owner.users.includes(user)) {
            await task.deleteTask();
            return res.json({error: false});
        }
    } else {
        return res.json({error: true});
    }
});

module.exports = router;