const express = require('express');
const router = express.Router();
const signupModel = require('../schema/user');

router.post('/login', async (req, res) => {
    console.log(req.body)
    const existingUser = await signupModel.findOne({ username: req.body.username });
    if(existingUser){
        if(existingUser.password === req.body.password){
            res.json(existingUser)
        }
        else{
            res.send("unsuccess")
        }
    }
    else{
        res.send("user doesn't exist")
    }
});

module.exports = router;
