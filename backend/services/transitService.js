const transitRepo = require('../repositories/transitRepo');

const fetchAlllines = async () => {
    try {
        console.log("Calling transitRepo to fetch all lines...");
        const lines = await transitRepo.getAllLines();
        console.log("Fetched all lines from transitRepo.");
        return lines;
    } catch (error) {
        console.error('Service error:', error.message);
        throw new Error('Service error: ' + error.message);
    }
};

const getLineById = async (id) => {
    try {
        console.log("Calling transitRepo to fetch a line...");
        const line = await transitRepo.getLineById(id);
        console.log("Fetched line from transitRepo.");
        return line;
    } catch (err) {
        console.error('Service error:', err.message);
        throw new Error('Service error: ' + err.message);
    }
};
const getStopById = async (id) => {
    try {
        console.log("Calling transitRepo to fetch a stop...");
        const stop = await transitRepo.getStopById(id);
        console.log("Fetched stop from transitRepo.");
        return stop;
    } catch (err) {
        console.error('Service error:', err.message);
        throw new Error('Service error: ' + err.message);
    }
}
const createStop = async (name, latitude, longitude) => {
    try {
        console.log("Calling transitRepo to create a stop...");
        const newstop = await transitRepo.createStop(name, latitude, longitude);
        console.log("Created stop in transitRepo.");
        return newstop;
    } catch (error) {
        console.error('Service error:', error.message);
        throw new Error('Service error: ' + error.message);
    }
};

const createLine = async (name, fee, stopss) => {
    try {
        console.log("Calling transitRepo to create a line...");
        const newline = await transitRepo.createLine(name, fee, stopss);
        console.log("Created line in transitRepo.");
        return newline;
    } catch (error) {
        console.error('Service error:', error.message);
        throw new Error('Service error: ' + error.message);
    }

};

const editline = async (id, updates) => {
    try {
        console.log("Calling transitRepo to edit a line...");
        const line = await transitRepo.editline(id, updates);
        console.log("Edited line in transitRepo.");
        return line;
    } catch (error) {
        console.error('Service error:', error.message);
        throw new Error('Service error: ' + error.message);
    }

};

const deleteline = async (id) => {
    try {
        console.log("Calling transitRepo to delete a line...");
        const line = await transitRepo.deleteline(id);
        console.log("Deleted line in transitRepo.");
        return line;
    } catch (error) {
        console.error('Service error:', error.message);
        throw new Error('Service error: ' + error.message);
    }
};

const deletestop = async (id) => {
    try {
        console.log("Calling transitRepo to delete a stop...");
        const stop = await transitRepo.deletestop(id);
        console.log("Deleted stop in transitRepo.");
        return stop;
    } catch (error) {
        console.error('Service error:', error.message);
        throw new Error('Service error: ' + error.message);
    }
};

module.exports = {
    fetchAlllines,
    getLineById,
    getStopById,
    createStop,
    createLine,
    editline,
    deleteline,
    deletestop
};