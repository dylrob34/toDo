import express from "express";
const router = express.Router();
import database from "../database/data";
import auth from "./auth";
import Task from "../database/models/task";
import Team from "../database/models/teams";

router.get('/getTasks', auth.verifyToken, async (req: any, res) => {
    const tasks = await database.getTasks(req.authData.user);
    return res.json({tasks});
});

router.post("/getTeamTasks", auth.verifyToken, async (req, res) => {
    const tasks = await database.getTeamTasks(req.body.team);
    return res.json({tasks});
})

router.post('/createTask', auth.verifyToken, async (req: any, res) => {
    let user = null;
    let team = null;
    if (req.body.team !== undefined) {
        team = req.body.team;
    } else {
        user = req.authData.user;
    }
    const assignees: string[] = [];
    const title: string = req.body.title;
    const body: string = req.body.body;

    const task = await Task.createTask(user, team, assignees, title, body);
    return res.json({error: false});
});

router.post('/editTask', auth.verifyToken, async (req: any, res) => {
    const user = req.authData.user;
    const taskId = req.body.id;
    const assignees = req.body.assignees;
    const title = req.body.title;
    const body = req.body.body;
    const task = await Task.getTask(taskId);
    if (task.team !== undefined) {
        const team = await Team.getTeam(task.team) as Team;
        if (team.owner === user || team.admins.includes(user) || team.users.includes(user)) {
            await task.editTask(assignees, title, body);
            return res.json({error: false});
        }
    }
    if (task.user === user) {
        await task.editTask(assignees, title, body);
        return res.json({error:false});
    }
    return res.json({error: true});
});

router.post('/deleteTask', auth.verifyToken, async (req: any, res) => {
    const user = req.authData.user;
    const taskId = req.body.id;
    const task = await Task.getTask(taskId);
    if (task.user === user) {
        await task.deleteTask();
        return res.json({error: false});
    } else {
        return res.json({error: true});
    }
});

export default router;