var express = require('express');
var router = express.Router();
var auth = require("./auth");
const Category = require("../database/models/category")

router.get('/getCategories', auth.verifyToken, async function(req, res) {
    const categories = await Category.getCategories(req.authData.user);
    return res.json({categories});
});

router.post("/getCategory", auth.verifyToken, async (req, res) => {
    const category = await Category.getCategory(req.body.id);
    return res.json({category});
})

router.post('/createCategory', auth.verifyToken, async function(req, res) {
    const owner = req.authData.user;
    const title = req.body.title;
    const color = req.body.color;

    const category = await Category.createCategory(owner, title, color);
    
    return res.json({error: false, category});
});

router.post('/editCategory', auth.verifyToken, async function(req, res) {
    const owner = req.authData.user;
    const id = req.body.id;
    const title = req.body.title;
    const color = req.body.color;
    const category = await Category.getCategory(id);

    if (category.owner === owner) {
        await category.edit(title, color);
        return res.json({error:false});
    }

    return res.json({error: true});
});

router.post('/deleteCategory', auth.verifyToken, async function(req, res) {
    const owner = req.authData.user;
    const id = req.body.id;
    const category = await Category.getCategory(id);

    if (category.owner === owner) {
        await category.delete();
        return res.json({error: false});
    }
    
    return res.json({error: true});
});

module.exports = router;