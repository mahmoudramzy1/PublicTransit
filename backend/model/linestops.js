const { Model , DataTypes } = require('sequelize');
const sequelize = require('./index');

class lineStops extends Model {
    static initModel(sequelize) {
    lineStops.init({
        lineId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Lines',
                key: 'line_id'
            }
        },
        stopId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'stops',
                key: 'stop_id'
            }
        },
    }, {
        sequelize,
        modelName: 'lineStops',
        tebleName: 'lineStops',
    });
}
}


module.exports = lineStops;