var express = require('express');
const { toAsyncRouter } = require("../errorHandler");
const router = toAsyncRouter(express.Router());
var auth = require("./auth");
const Timeblock = require("../database/models/timeblock");
const Category = require("../database/models/category");

router.post("/getTimeblocksWeek", async (req, res) => {
    const timeblocks = await Timeblock.getTimeblocksWeek(req.authData.user, req.body.week);
    return res.json({timeblocks});
})

router.get('/getTimeblocks', async function(req, res) {
    const timeblocks = await Timeblock.getTimeblocks(req.authData.user);
    return res.json({timeblocks});
});

router.post("/getTimeblock", async (req, res) => {
    const timeblock = await Timeblock.getTimeblock(req.body._id);
    return res.json({timeblock});
})

router.post('/createTimeblock', async function(req, res) {
    const owner = req.authData.user;
    const title = req.body.title === "" ? "New Block" : req.body.title;
    const body = req.body.body;
    const time = req.body.time;
    const duration = req.body.duration;
    const category = req.body.category;
    const date = req.body.date;

    let cat = null;

    if (category !== null) {
        temp = await Category.getCategory(category);
        if (temp.owner !== owner) return res.json({error: true, message: "You do not own that category"});
        cat = temp._id;
    }

    const timeblock = await Timeblock.createTimeblock(owner, title, body, time, duration, cat, date);
    
    return res.json({error: false, timeblock});
});

router.post('/editTimeblock', async function(req, res) {
    const owner = req.authData.user;
    const id = req.body._id;
    const title = req.body.title;
    const body = req.body.body;
    const time = req.body.time;
    const duration = req.body.duration;
    const category = req.body.category === 0 ? null : req.body.category;
    const date = req.body.date

    const timeblock = await Timeblock.getTimeblock(id);

    if (timeblock.owner === owner) {
        await timeblock.edit(title, body, time, duration, category, date);
        return res.json({error:false});
    }

    return res.json({error: true, message: "You do not own this timeblock"});
});

router.post('/deleteTimeblock', async function(req, res) {
    const owner = req.authData.user;
    const id = req.body._id;
    const timeblock = await Timeblock.getTimeblock(id);

    if (timeblock.owner === owner) {
        await timeblock.delete();
        return res.json({error: false});
    }
    
    return res.json({error: true});
});

module.exports = router;