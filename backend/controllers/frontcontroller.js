const express = require('express');
const transitService = require('../services/transitService');

const acceptroute = (req, res) => {
    try {
        const { origin, destination } = req.body;
        if (!origin || !destination) {
            return res.status(400).send('Origin and destination are required');
        }
        res.json({ message: 'Coordinates received', origin, destination });
    } catch (err) {
        console.error('Controller error:', err.message);
        res.status(500).send('Internal server error: ' + err.message);
    }
}
module.exports = { acceptroute};