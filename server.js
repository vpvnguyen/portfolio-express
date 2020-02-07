// IMPORTS ==========================================
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/cors'); // reconfigure to limit cors
const morgan = require('morgan');
const connectMongoDB = require('./config/mongoDB.js');

const homeController = require('./controller/home.controller.js');
const projectsController = require('./controller/projects.controller.js');

// CONFIGS ==========================================
require('dotenv').config();
app.use(cors());

// connect mongodb
const MONGODB_URI = "mongodb://localhost:27017/portfolio";
connectMongoDB(MONGODB_URI);

// MIDDLEWARE ==========================================
// handle url encoded data; parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make public static
app.use(express.static('public'));
// server side logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { accessLogStream }));
// allow cors
app.use(cors());

// CONTROLLER ==========================================
app.use(homeController);
app.use(projectsController);

// ROUTING ========================================
// GET - test
app.get('/', (req, res) => {
    res.send('/')
});

app.get('/test', (req, res) => {
    res.send('test');
})
// POST - test
app.post(`/api/:P_USERNAME`, cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
// PUT - test
app.put(`/api/:PUT`, cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
// DEL - test
app.delete(`/api/:DEL`, cors(corsOptions), (req, res) => { 
    console.log(req.body);
    res.send(req.body);
});

app.listen(PORT, () => console.log(`Portfolio Express Server running on PORT: ${PORT}`));
