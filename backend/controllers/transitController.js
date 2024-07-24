const express = require('express');
const transitService = require('../services/transitService');
const { findAndCountAll, update, findByPk } = require('../model/lines');

const getLines = async (req, res) => {
    try {
        console.log("Controller: Fetching all lines...");
        const lines = await transitService.fetchAlllines();
        console.log("Controller: Fetched all lines.");
        res.json(lines);
    } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).send('Internal server error: ' + error.message);
    }
};

const getLineById = async (req, res) => {
    try {
        console.log('controller: Fetching a line by id...');
        const { id } = req.params;
        if (!id) {
            return res.status(400).send('Line id is required');
        }
        const line = await transitService.getLineById(id);
        res.json(line);
    } catch (err) {
        console.error('Controller error:', err.message);
        res.status(500).send('Internal server error: ' + err.message);
    }
};

const getStopById = async (req, res) => {
    try {
        console.log('controller: Fetching a stop by id...');
        const { id } = req.params;
        if (!id) {
            return res.status(400).send('Stop id is required');
        }
        const stop = await transitService.getStopById(id);
        res.json(stop);
    } catch (err) {
        console.error('Controller error:', err.message);
        res.status(500).send('Internal server error: ' + err.message);
    }

}

const testController = async (req, res) => {
    console.log('Controller: Test endpoint hit');
    res.json({ message: 'Test controller successfully' });
};

const createStop = async (req, res) => {
    try {
        console.log("Controller: Creating a stop...");
        const { name, latitude, longitude } = req.body;
        if (!name || latitude === undefined || longitude === undefined) {
            return res.status(400).send('Name, latitude, and longitude are required.');
        }
        console.log('inputs'+ name+','+ latitude+','+ longitude);
        const newstop = await transitService.createStop(name, latitude, longitude);
        console.log("Controller: Created stop.");
        res.status(201).json(newstop);
    } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).send('Internal server error: ' + error.message);
    }
};

const createLine = async (req, res) => {
    try {
        console.log("Controller: Creating a line...");
        const { name, fee, stopss } = req.body;
        if (!name || fee === undefined || !stopss) {
            return res.status(400).send('Name, fee, and stops are required.');
        }
        const newline = await transitService.createLine(name, fee, stopss);
        console.log("Controller: Created line.");
        res.status(201).json(newline);
    } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).send('Internal server error: ' + error.message);
    }

};

const editline = async (req, res) => {
    try {
        console.log("Controller: Editing a line...");
        const { id } = req.params;
        const updates = req.body;
        if (!id){
            return res.status(400).message('Line id is required');
        }

        const updateline = await transitService.editline(id, updates);
        res.status(200).json(updateline);

    } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).send('Internal server error: ' + error.message);
    }
};

const deleteline = async (req, res) => {
    try {
        console.log("Controller: Deleting a line...");
        const { id } = req.params;
        if (!id){
            return res.status(400).message('Line id is required');
        }
        const deleteline = await transitService.deleteline(id);
        res.status(200).json(deleteline);

    } catch (error) {
        console.error('Controller error:', error.message);
        res.status(500).send('Internal server error: ' + error.message);
    }
};

const deletestop = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send('stop id is required');
        }
        const deletedstop = await transitService.deletestop(id);
        res.status(200).json(deletedstop);
    } catch (err) {
        console.error('Controller error:', err.message);
        res.status(500).send('Internal server error: ' + err.message);
    }
};

module.exports = {
    getLines,
    getLineById,
    getStopById,
    testController,
    createStop,
    createLine,
    editline,
    deleteline,
    deletestop
};