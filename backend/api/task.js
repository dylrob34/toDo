var express = require('express');
const { toAsyncRouter } = require("../errorHandler");
const router = toAsyncRouter(express.Router());
var auth = require("./auth");
const Task = require("../database/models/task");
const Owner = require("../database/models/owner");

router.get('/getTasks', async function(req, res) {
    const tasks = await Task.getTasks(req.authData.user);
    return res.json({tasks});
});

router.post("/getTeamTasks", async (req, res) => {
    const tasks = await Task.getTasks(req.body.team);
    return res.json({tasks});
})

router.post('/createTask', async function(req, res) {
    const assignees = [];
    const title = req.body.title;
    const body = req.body.body;
    const duedate = req.body.duedate
    const task = await Task.createTask(req.body.team || req.authData.user, assignees, title, body, duedate);
    
    return res.json({error: false});
});

router.post('/editTask', async function(req, res) {
    const user = req.authData.user;
    const taskId = req.body.id;
    const assignees = req.body.assignees;
    const title = req.body.title;
    const body = req.body.body;
    const duedate = req.body.duedate
    const complete = req.body.complete;
    const task = await Task.getTask(taskId);
    const owner = await Owner.getOwner(task.owner);
    if (task.owner === user) {
        await task.editTask(assignees, title, body, complete, duedate);
        return res.json({error:false});
    } else if (owner.owner === user || owner.admins.includes(user) || owner.users.includes(user)) {
        await task.editTask(assignees, title, body, complete, duedate);
        return res.json({error: false});
    }
    return res.json({error: true});
});

router.post('/deleteTask', async function(req, res) {
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