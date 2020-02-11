require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const morgan = require('morgan'); // server-side logging
const cors = require('cors');
const corsOptions = require('./config/cors'); // reconfigure to limit cors

// controllers
const homeController = require('./controller/home.controller.js');
const projectsController = require('./controller/projects.controller.js');
const authController = require('./controller/auth.controller.js');

// connect mongodb
const connectMongoDB = require('./config/mongoDB.js');
connectMongoDB(process.env.MONGODB_URI);

// MIDDLEWARE
app.use(cors()); // allow cors
app.use(express.urlencoded({ extended: true })); // handle url encoded data; parse json
app.use(express.json());
app.use(express.static('public')); // make public static
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }); // create server logs
app.use(morgan('combined', { accessLogStream })); // server side logging

// CONTROLLER
app.use(homeController);
app.use(projectsController);
app.use(authController);

// ROUTING
// GET - test
app.get('/', (req, res) => {
    res.send('/')
});

app.get('/test', (req, res) => {
    res.send('test');
})
// POST - test
app.post(`/test/:P_USERNAME`, cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
// PUT - test
app.put(`/test/:PUT`, cors(corsOptions), (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
// DEL - test
app.delete(`/test/:DEL`, cors(corsOptions), (req, res) => { 
    console.log(req.body);
    res.send(req.body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`<NODE_ENV: ${process.env.NODE_ENV}>Portfolio Express Server running on PORT: ${PORT}\n`));
