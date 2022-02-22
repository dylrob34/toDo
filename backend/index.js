var express = require('express');
var path = require('path');
var router = express.Router();

/* Home Page */
router.get('*', function(req, res, next) {
    return res.sendFile('index.html', { root: __dirname + "/build" });
});

module.exports = router;