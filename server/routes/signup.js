const express = require('express');
const router = express.Router();
const signupModel = require('../schema/user');

router.post('/signup', async (req, res) => {
    console.log(req.body)
    const existingUser = await signupModel.findOne({ username: req.body.username });
    if (existingUser) {
        return res.send('Username already exists' );
    }
    signupModel.create(req.body)
    .then(data=>{
        console.log(data)
        res.json(data)
        console.log("data send to mongo sucessfully")
    })
    .catch(err=>{
        console.log(err)
        res.status(404)
    })
});

module.exports = router;
