import express from "express";
const router = express.Router();
import database from "../database/data";
import auth from "./auth";
import jwt from "jsonwebtoken";
import User from "../database/models/user";

router.get('/getUser', auth.verifyToken, async (req: any, res) => {
    const user = await User.getUser(req.authData.user);
    res.json({user});
});

router.post('/createUser', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email.toLowerCase();
    const pass = req.body.password;
    const passCheck = req.body.passCheck;
    try {
        const user = await User.createUser(email, pass, passCheck, firstName, lastName, true);
    } catch (error) {
        return res.json({error:true, message: error});
    }
    jwt.sign({ user: email }, process.env.secretKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            console.log("signing error");
            return res.json({error: true});
        }
        res.cookie("jwt", token);
        return res.json({
            error: false,
            loggedIn: true,
            token
        });
    });
});


export default router;