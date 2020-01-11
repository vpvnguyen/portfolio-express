const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// dot env
require('dotenv').config();

// connect to mongoDB
const connectMongoDB = require('./config/mongoDB.js');

// handle url encoded data; parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public static
app.use(express.static('public'));

// server side logging
const  accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { accessLogStream }));

// connect to mongoDB; ./config/mongoDB.js
connectMongoDB();

// GET - test
app.get('/', (req, res) => {
    res.send('/ GET');
});

// POST - test
app.post(`/api/:P_USERNAME`, (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// PUT - test
app.put(`/api/:PUT`, (req, res) => {
    console.log(req.body);
    res.send('PUT');
});

// DEL - test
app.delete(`/api/:DEL`, (req, res) => {
    console.log(req.body);
    res.send('DEL');
});

app.listen(PORT, () => console.log(`Portfolio Express Server running on PORT: ${PORT}`));
