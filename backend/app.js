const express = require('express');
const { sequelize, Line } = require('./model');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const transitRoute = require('./routes/transitRoute');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
const port = 8082;

console.log("hello");

// sequelize.sync();
// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use('/api', transitRoute);

// app.get('/line-stops', (req, res) => {
//     Line.findAll()
// })

app.get('/stops/:id', (req, res) => {
    const { id } = req.params;
    Location.findByPk(id)
        .then(location => {
            if (location) {
                res.json(location);
            } else {
                res.status(404).send('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            res.status(500).send(`Internal Server Error: ${error.message}`);
        });
});
// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../mymap/build')));

// Catch all other routes and return the index.html file from the React app build directory
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../mymap/build', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});