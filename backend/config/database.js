const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('testing', 'root', '', {
    dialect: 'mysql',  // Or your preferred dialect
    host: 'localhost', // Or your database host
    define: {
        timestamps: true
    }
});

module.exports = sequelize;