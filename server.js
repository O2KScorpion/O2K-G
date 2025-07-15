const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Your real Discord webhook URL here:
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1394692627752030229/lT2xwOld3oioJ_Z4HLbZFj8RXN27JkLJyllShdcY9DJrp-Dm8GnZ5qedVlnRfVjOHHVz";

app.post('/send-to-discord', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        });

        if (response.ok) {
            res.status(200).send('Notification sent to Discord!');
        } else {
            res.status(500).send('Failed to send to Discord.');
        }
    } catch (error) {
        console.error('Error sending to Discord:', error);
        res.status(500).send('Error sending to Discord.');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
