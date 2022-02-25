var express = require('express');
const { toAsyncRouter } = require("../errorHandler");
const router = toAsyncRouter(express.Router());
const database = require("../database/data");
var auth = require("./auth");


router.post('/submitBug', async function(req, res) {
    const type = req.body.type;
    const page = req.body.page;
    const desc = req.body.desc;

    const bugsuggestion = await database.submitBugSuggestion(type, page, desc);
    
    return res.json({error: false});
});

module.exports = router;