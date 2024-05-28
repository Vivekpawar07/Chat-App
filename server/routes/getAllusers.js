const express = require('express');
const router = express.Router();
const signupModel = require('../schema/user');

router.post('/contacts', async (req, res) => {
    const allUsers = await signupModel.find(
        { username: { $ne: req.body.username } },
        { username: 1, Avatar: 1, _id: 1 ,isOnline:1}
    );
    res.json(allUsers)
});

module.exports = router;
