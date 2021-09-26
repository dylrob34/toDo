import express from "express";
import path from "path";
const router = express.Router();

/* Home Page */
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "build", '/index.html'));
});

export default router;