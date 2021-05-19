var express = require('express');
var path = require('path');
var router = express.Router();

/* Home Page */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../index.html'));
})

module.exports = router;