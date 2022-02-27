var express = require('express');
const { toAsyncRouter } = require("../errorHandler");
const router = toAsyncRouter(express.Router());
var auth = require("./auth");
const User = require("../database/models/user");
const Team = require('../database/models/teams');
const Bucket = require("../database/models/buckets");
const Task = require("../database/models/task");
const Owner = require("../database/models/owner");

router.post('/createBucket', async function(req, res) {
    const owner = (req.body.team === "" || req.body.team === undefined) ? req.authData.user : req.body.team;
    try {
        const bucket = await Bucket.createBucket(owner, req.body.name);
        return res.json(bucket);
    } catch (error) {
      return res.json({error: true, message: error});
    }
    return res.json({error: false});
});

// // Manually add bucket function
// router.post('/addBucket', async function(req, res){
//     const owner = req.authData.user;
//     const name = req.name;

//     const bucket = await Bucket.createBucket(owner, name);

//     return res.json({error: false, bucket});
// })



router.post("/getBucket", async (req, res) => {
    const bucket = await Bucket.getBucket(req.body._id);
    return res.json({bucket});
})

router.post("/getBuckets", async (req, res) => {
    try {
        let buckets = null;
        if (req.body.team === undefined || req.body.team === "" || req.body.team === null) {
            buckets = await Bucket.getBuckets(req.authData.user);
        } else {
            buckets = await Bucket.getBuckets(req.body.team);
        }
        return res.json({buckets});
    } catch (error) {
        return res.json({error: true, message: error});
    }
})

router.post("/getTaskBuckets", async (req, res) => {
    const task = await Task.getTask(req.body._id);
    let buckets = [];
    for (const bucket of task.buckets) {
        const temp = await Bucket.getBucket(bucket);
        buckets.push(temp.name);
    }
    return res.json({buckets});
})

router.post("/getBucketByName", async (req, res) => {
    const buckets = await Bucket.getBucketByName(req.authData.user, req.body.name);
    return res.json({buckets});
})

router.post('/editBucket', async function(req, res) {
    const user = await User.getUser(req.authData.user);
    const bucket = await Bucket.getBucket(req.body._id);
    if (bucket.owner === user.email) {
        await bucket.editBucket(req.body.name);
    } else {
        throw "User does not own this bucket";
    }
    res.json({error: false});
});

router.post('/deleteBucket', async function(req, res) {
    const user = await User.getUser(req.authData.user);
    let bucket = null;
    try {
        bucket = await Bucket.getBucket(req.body.bucket);
    } catch (error) {
        console.log(error);
        return res.json({error: true, message: "Bucket Does Not Exist"})
    }
    
    if (bucket.owner !== user.email) {
        throw "User does not own this bucket";
    }
    
    const tasks = await Task.getTasksWithBuckets(bucket.owner, bucket._id);
    if (tasks.length !== 0 ) {
        return res.json({error: true, message: "Bucket Still In Use"});
    }
    try {
        const own = await Owner.getOwner(bucket.owner);
        await own.deleteBucket(req.body.bucket);
        await bucket.deleteBucket();
    } catch (error) {
        console.log(error);
        return res.json({error: true, message: error});
    }
    return res.json({error: false});
});



module.exports = router;