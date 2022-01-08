var express = require('express');
var router = express.Router();
var auth = require("./auth");
const Timeblock = require("../database/models/timeblock");
const Category = require("../database/models/category");

router.get('/getTimeblocks', auth.verifyToken, async function(req, res) {
    const timeblocks = await Timeblock.getTimeblocks(req.authData.user);
    return res.json({timeblocks});
});

router.post("/getTimeblock", auth.verifyToken, async (req, res) => {
    const timeblock = await Timeblock.getTimeblock(req.body.id);
    return res.json({timeblock});
})

router.post('/createTimeblock', auth.verifyToken, async function(req, res) {
    const owner = req.authData.user;
    const title = req.body.title;
    const body = req.body.body;
    const dow = req.body.dow;
    const time = req.body.time;
    const duration = req.body.duration;
    const category = req.body.category;

    if (category !== null) {
        const cat = await Category.getCategory(category);
        if (cat === null) return res.json({error: true, message: "Invalid Category"});
        if (cat.owner !== owner) return res.json({error: true, message: "Invalid Category"});
    }

    const timeblock = await Timeblock.createTimeblock(owner, title, body, dow, time, duration, category);
    
    return res.json({error: false, timeblock});
});

router.post('/editTimeblock', auth.verifyToken, async function(req, res) {
    const owner = req.authData.user;
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const dow = req.body.dow;
    const time = req.body.time;
    const duration = req.body.duration;
    const category = req.body.category;

    const timeblock = await Timeblock.getTimeblock(id);

    if (timeblock.owner === owner) {
        await timeblock.edit(title, body, dow, time, duration, category);
        return res.json({error:false});
    }

    return res.json({error: true});
});

router.post('/deleteTimeblock', auth.verifyToken, async function(req, res) {
    const owner = req.authData.user;
    const id = req.body.id;
    const timeblock = await Timeblock.getTimeblock(id);

    if (timeblock.owner === owner) {
        await timeblock.delete();
        return res.json({error: false});
    }
    
    return res.json({error: true});
});

module.exports = router;