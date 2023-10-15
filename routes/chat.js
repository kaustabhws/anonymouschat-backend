const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Chat = require('../models/Chats');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Chats using: GET "/api/notes/fetchallchats"
router.get('/fetchallchats', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json(chats)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Chat using: POST "/api/notes/addnote"
router.post('/addchat', [
    body('body', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { body, vote } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const chat = new Chat({
                body, vote
            })
            const savedChat = await chat.save()

            res.json(savedChat)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

router.get('/details/:id', async (req, res) => {
    try {
        const chatId = req.params.id;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(chat);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/vote/:id', async (req, res) => {
    try {
        const chatId = req.params.id;

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        chat.vote += 1;
        await chat.save();

        res.json(chat);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router