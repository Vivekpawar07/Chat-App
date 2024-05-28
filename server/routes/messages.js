const express = require('express');
const router = express.Router();
const messagesModel = require('../schema/message');

router.post('/addmessage', async (req, res) => {
    const { from, to, msg } = req.body;
    
    // Validate message text
    if (!msg || !msg.trim()) {
        return res.status(400).json({ error: "Message text is required" });
    }

    try {
        const data = await messagesModel.create({
            message: { text: msg },
            users: [from, to],
            sender: from
        });
        res.json("added data successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("got an error while adding data");
    }
});

module.exports = router;
