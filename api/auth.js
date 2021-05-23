var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* Login API */
router.post('/login', function(req, res) {
    const user = req.body.user;
    const pass = req.body.pass;
    res.json({
        message: 'Login api'
    });
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
}

module.exports = router;