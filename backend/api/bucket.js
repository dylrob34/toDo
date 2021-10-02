var express = require('express');
var router = express.Router();
var auth = require("./auth");
const User = require("../database/models/user");
const Team = require('../database/models/teams');
const Bucket = require("../database/models/buckets");
const Task = require("../database/models/task");

router.post('/createBucket', auth.verifyToken, async function(req, res) {
    const user = await User.getUser(req.authData.user);
    try {
        const bucket = await Bucket.createBucket(req.body.name, req.authData.user, req.body.team);
        return res.json(bucket);
    } catch (error) {
      return res.json({error: true, message: error});
    }
    return res.json({error: false});
});

router.post("/getBucket", auth.verifyToken, async (req, res) => {
    const bucket = await Bucket.getBucket(req.body._id);
    return res.json({bucket});
})

router.post("/getBuckets", auth.verifyToken, async (req, res) => {
    try {
        let buckets = null;
        if (req.body.team !== "") {
            buckets = await Bucket.getBuckets(req.body.team);
        } else {
            buckets = await Bucket.getBuckets(req.authData.user);
        }
        return res.json({buckets});
    } catch (error) {
        return res.json({error: true, message: error});
    }
})

router.post("/getTaskBuckets", auth.verifyToken, async (req, res) => {
    const task = await Task.getTask(req.body._id);
    let buckets = [];
    for (const bucket of task.buckets) {
        const temp = await Bucket.getBucket(bucket);
        buckets.push(temp.name);
    }
    return res.json({buckets});
})

router.post("/getBucketByName", auth.verifyToken, async (req, res) => {
    const buckets = await Bucket.getBucketByName(req.authData.user, req.body.name);
    return res.json({buckets});
})

router.post('/editBucket', auth.verifyToken, async function(req, res) {
    try {
        const user = await User.getUser(req.authData.user);
        const bucket = await Bucket.getBucket(req.body._id);
        if (bucket.user === user.email) {
            await bucket.editBucket(req.body.name);
        } else {
            throw "User does not own this bucket";
        }
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});

router.post('/deleteBucket', auth.verifyToken, async function(req, res) {
    const user = await User.getUser(req.authData.user);
    try {
        await user.deleteBucket(req.body.bucket);
    } catch (error) {
        return res.json({error: true, message: error});
    }
    res.json({error: false});
});



module.exports = router;