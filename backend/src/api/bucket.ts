import express from "express";
const router = express.Router();
import auth from "./auth";
import User from "../database/models/user";
import Team from "../database/models/teams";

router.post('/addBucket', auth.verifyToken, async (req: any, res) => {
    if (req.body.type === "user") {
        const user = await User.getUser(req.authData.user);
        try {
            await user.addBucket(req.body.bucket);
        } catch (error) {
            return res.json({error: true, message: error});
        }
    } else if (req.body.type === "team") {
        const team = await Team.getTeam(req.body.id);
        try {
            await team.addBucket(req.body.bucket);
        } catch (error) {
            return res.json({error: true, message: error});
        }
    }
    res.json({error: false});
});

router.post('/editBucket', auth.verifyToken, async (req: any, res) => {
    const user = await User.getUser(req.authData.user);
    try {
        await user.editBucket(req.body.oldBucket, req.body.newBucket);
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});

router.post('/deleteBucket', auth.verifyToken, async (req: any, res) => {
    const user = await User.getUser(req.authData.user);
    try {
        await user.deleteBucket(req.body.bucket);
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});



export default router;