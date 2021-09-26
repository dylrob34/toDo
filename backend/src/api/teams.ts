import express from "express";
const router = express.Router();
import auth from "./auth";
import User from "../database/models/user";
import Team from "../database/models/teams";

router.post('/createTeam', auth.verifyToken, async (req: any, res) => {
    console.log(`name: ${req.body.name}`)
    const team = await Team.createTeam(req.authData.user, req.body.name);
    if (team != null) {
        return res.json(team);
    }
    return res.json({error: false});
});

router.get('/getTeams', auth.verifyToken, async (req: any, res) => {
    const teams = await Team.getTeams(req.authData.user);
    return res.json({teams});
})

router.post("/getTeam", auth.verifyToken, async (req, res) => {
    const team = await Team.getTeam(req.body.team);
    return res.json({team});
})

router.post('/editTeam', auth.verifyToken, async (req: any, res) => {
    const user = await User.getUser(req.authData.user);
    try {
        await user.editBucket(req.body.oldBucket, req.body.newBucket);
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});

router.post('/deleteTeam', auth.verifyToken, async (req: any, res) => {
    const user = await User.getUser(req.authData.user);
    try {
        await user.deleteBucket(req.body.bucket);
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});


export default router;