var express = require('express');
var router = express.Router();
var auth = require("./auth");
const Timeblock = require("../database/models/timeblock");
const Category = require("../database/models/category");

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
    const dow = req.body.dow;
    const time = req.body.time;
    const duration = req.body.duration;
    const category = req.body.category;

    let cat = null;

    if (category !== null) {
        temp = await Category.getCategory(category);
        if (temp.owner !== owner) return res.json({error: true, message: "You do not own that category"});
        cat = temp._id;
    }

    const timeblock = await Timeblock.createTimeblock(owner, title, body, dow, time, duration, cat);
    
    return res.json({error: false, timeblock});
});

router.post('/editTimeblock', async function(req, res) {
    const owner = req.authData.user;
    const id = req.body._id;
    const title = req.body.title;
    const body = req.body.body;
    const dow = req.body.dow;
    const time = req.body.time;
    const duration = req.body.duration;
    const category = req.body.category === "None" ? null : req.body.category;
    //console.log(req.body);
    //return (res.json({error: false}))

    const timeblock = await Timeblock.getTimeblock(id);

    if (timeblock.owner === owner) {
        try {
            await timeblock.edit(title, body, dow, time, duration, category);
            return res.json({error:false});
        } catch (message) {
            return res.json({error: true, message})
        }
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