var express = require('express');
var router = express.Router();
var auth = require("./auth");
const User = require("../database/models/user");
const Team = require("../database/models/teams");

router.post('/createTeam', auth.verifyToken, async function(req, res) {
    console.log(`name: ${req.body.name}`)
    const team = await Team.createTeam(req.authData.user, req.body.name);
    if (team != null) {
        return res.json(team);
    }
    return res.json({error: false});
});

router.get('/getTeams', auth.verifyToken, async function(req, res) {
    const teams = await Team.getTeams(req.authData.user);
    return res.json({teams});
})

router.post("/getTeam", auth.verifyToken, async (req, res) => {
    const team = await Team.getTeam(req.body.team);
    return res.json({team});
})

router.post('/editTeam', auth.verifyToken, async function(req, res) {
    const user = await User.getUser(req.authData.user);
    try {
        await user.editBucket(req.body.oldBucket, req.body.newBucket);
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});

router.post('/getTeamsUsers', auth.verifyToken, async (req, res) => {
    try {
        const team = await Team.getTeam(req.body.team);
        res.json({users: team.getUsers()})
    } catch (error) {
        res.json({error: true, message: error});
    }
});

router.post('/deleteTeam', auth.verifyToken, async function(req, res) {
    const user = await User.getUser(req.authData.user);
    try {
        await user.deleteBucket(req.body.bucket);
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});



module.exports = router;