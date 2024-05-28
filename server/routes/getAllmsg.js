const express = require('express');
const router = express.Router();
const messagesModel = require('../schema/message');

router.post('/getmessage', async (req, res) => {
    const { from, to } = req.body;
    try {
        const messages = await messagesModel.find({
            users: {
                $all: [from, to],
            }
        }).sort({ updatedAt: -1 }); 
        
        const projectedMsg = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            };
        });
        res.json(projectedMsg);
    } catch (err) {
        console.error(err);
        res.status(500).json("Error occurred while fetching messages");
    }
});

module.exports = router;
