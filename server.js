// IMPORTS ==========================================
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/cors');
const morgan = require('morgan');
const connectMongoDB = require('./config/mongoDB.js');

// CONFIGS ==========================================
require('dotenv').config();
app.use(cors());
// connect to mongoDB; ./config/mongoDB.js
connectMongoDB();

// MIDDLEWARE ==========================================
// handle url encoded data; parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make public static
app.use(express.static('public'));
// server side logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { accessLogStream }));

// ROUTING ========================================
// GET - test
app.get('/', cors(corsOptions), (req, res) => {
    res.send('/ GET');
});
// POST - test
app.post(`/api/:P_USERNAME`, cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
// PUT - test
app.put(`/api/:PUT`, cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send('PUT');
});
// DEL - test
app.delete(`/api/:DEL`, cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send('DEL');
});



app.listen(PORT, () => console.log(`Portfolio Express Server running on PORT: ${PORT}`));
