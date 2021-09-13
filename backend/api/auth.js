const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var database = require("../database/data");

/* Login API */
router.post('/login', async function(req, res) {
    if (req.body.user === "" || req.body.pass === "") {
        res.json({error: true, login: false});
        return;
    }
    console.log(req.body.user + " Attempting to login...")
    const pass = req.body.pass;
    var user = await database.getUser(req.body.user);
    if (user === false || (typeof user) == "undefined") {
        console.log("Error: idk");
        res.json({ error: true });
    } else {
        bcrypt.compare(pass, user.password, (err, result) => {
            if (result) {
                jwt.sign({ user: user.email }, process.env.secretKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        console.log("signing error");
                        res.json({error: true});
                    } 
                    res.cookie("jwt", token);
                    res.json({
                        error: false,
                        loggedIn: true,
                        token
                    });
                });
            } else {
                res.json({error: true, login: false});
            }
        });
    }
});

router.get('/checkLogin', async function(req, res) {
    res.json({loggedIn: true});
})


function hashPassword(pass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, 10)
        .then((hashed) => {resolve(hashed);});
    });
}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, process.env.secretKey, async (err, data) => {
      if (err) {
        return res.json({error: true, message: "You are not logged in"});
      } else {
          req.authData = data;
          return next();
      }
    })
  } else {
    return res.json({error: true});
  }
}

module.exports = { router, hashPassword, verifyToken };