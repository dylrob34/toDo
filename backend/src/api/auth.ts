import express, { Response, NextFunction } from "express";
const router = express.Router();
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

import database from "../database/data";

/* Login API */
router.post('/login', async (req, res) => {
    if (req.body.user === "" || req.body.pass === "") {
        return res.json({error: true, login: false});
    }
    const email = req.body.user.toLowerCase()
    console.log(email + " Attempting to login...")
    const pass = req.body.pass;
    class User {
        _id: ObjectId;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        buckets: string[];
    }
    const user = await database.getUser(email) as User;
    if (user === null || (typeof user) === "undefined") {
        console.log("Error: idk");
        res.json({ error: true });
    } else {
        bcrypt.compare(pass, user.password, (err, result) => {
            if (result) {
                jwt.sign({ user: user.email }, process.env.secretKey, { expiresIn: "2h" }, (errr, token) => {
                    if (errr) {
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

router.get('/checkLogin', async (req, res) => {
    res.json({loggedIn: true});
})


function hashPassword(pass: string) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, 10)
        .then((hashed) => {resolve(hashed);});
    });
}

function verifyToken(req: any, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.secretKey, async (err: any, data: any) => {
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

export default { router, hashPassword, verifyToken };