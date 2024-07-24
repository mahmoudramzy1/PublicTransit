const sequelize = require('../config/database');
const Line= require('./lines');
const stops = require('./stops');
const lineStops = require('./linestops');

// Initialize models
Line.initModel(sequelize);
stops.initModel(sequelize);
lineStops.initModel(sequelize);

// Define relationships
Line.belongsToMany(stops, { through: lineStops, foreignKey: 'lineId' });
stops.belongsToMany(Line, { through: lineStops, foreignKey: 'stopId' });

// Sync models with the database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

module.exports = {
    Line,
    stops,
    lineStops,
    sequelize
};
