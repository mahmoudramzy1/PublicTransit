const { Line, stops } = require("../model");

const getAllLines = async () => {
    try {
        console.log("I'm in repo to fetch data from database");

        // Check if models are loaded correctly
        console.log('Line model:', Line);

        const lines = await Line.findAll({
            include: [
                { model: stops, through: {attributes:[]} }
            ]
        });

        console.log('No problem in repo');
        console.log('Lines fetched:', lines);

        return lines;
    } catch (error) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }
};

const getLineById = async (id) => {
    try {
        console.log("I'm in repo to fetch data from database");

        // Check if models are loaded correctly
        console.log('Line model:', Line);

        const line = await Line.findByPk(id, {
            include: [
                { model: stops, through: {attributes:[]} }
            ]
        });

        console.log('No problem in repo');
        console.log('Line fetched:', line);

        return line;
    } catch (error) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }

};
const getStopById = async (id) => {
    try {
        console.log("I'm in repo to fetch data from database");

        // Check if models are loaded correctly
        console.log('Stop model:', stops);

        const stop = await stops.findByPk(id);

        console.log('No problem in repo');
        console.log('Stop fetched:', stop);

        return stop;
    } catch (error) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }
};

const createStop = async (name, latitude, longitude) => {
    try {
        console.log("I'm in repo to create a stop");
        const newstop = await stops.create({
            name,
            latitude,
            longitude
        });
        console.log('Stop created:', stops);
        return newstop;
    } catch (error) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }

};

const createLine = async (name, fee, stopss) => {
    try {
        console.log("I'm in repo to create a line");
        const newline = await Line.create({
            name,
            fee
        });
        if (stopss && stopss.length > 0) {
            const stopInstances = [];
            for (const stop of stopss) {
                console.log("stop in" + stop);
                let stopInstance = await stops.findOne({where: {name: stop}});
                if (!stopInstance) {
                    throw new Error(`Stop ${stop} not found`);
                }
                await newline.addStops(stopInstance);
                stopInstances.push(stopInstance);
            };
            // console.log('this is the instances ' +stopInstances);
            await newline.addStops(stopInstances);
        }

        console.log('Line created:', newline);
        return newline;
    } catch (error) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }
};

const editline = async (id, updates) => {
    try {
        console.log("I'm in repo to edit a line");
        const line = await Line.findByPk(id);
        if (!line) {
            throw new Error(`Line ${id} not found`);
        }
        const { name , fee , Stops } = updates;
        if (name !== undefined) line.name = name;
        if (fee !== undefined) line.fee = fee;
        if (Stops && Stops.length > 0) {
            console.log("i'm updating stops")
            const stopInstances = [];
            for (const stop of Stops) {
                console.log("the stop is " + stop)
                let stopInstance = await stops.findOne({ where: { name: stop } });
                if (!stopInstance) {
                    throw new Error(`Stop ${stop} not found`);
                }
                stopInstances.push(stopInstance);
            }
            await line.addStops(stopInstances);
        }
        console.log('Line updated:', line);
        return line;
    } catch (error) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }


};

const deleteline = async (id) => {
    try {
        console.log("I'm in repo to delete a line");
        const line = await Line.findByPk(id);
        if (!line) {
            throw new Error(`Line ${id} not found`);
        }
        await line.destroy();
        console.log('Line deleted:', line);
        return line;
    } catch (error) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }
};

const deletestop = async (id) => {
    try{
        console.log("I'm in repo to delete a stop");
        const stop = await stops.findByPk(id);
        if (!stop) {
            throw new Error(`Stop ${id} not found`);
        }
        await stop.destroy();
        console.log('Stop deleted:', stop);
        return stop;
    }
    catch (err) {
        console.error(`Repo error: ${error.message}`);
        throw new Error(`Repo error: ${error.message}`);
    }
};

module.exports = {
    getAllLines,
    getLineById,
    getStopById,
    createStop,
    createLine,
    editline,
    deleteline,
    deletestop
};