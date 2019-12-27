const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const connectMongoDB = require('./config/mongoDB.js');

// handle url encoded data; parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public static
app.use(express.static('public'));

// connect to mongoDB; ./config/mongoDB.js
connectMongoDB();

// test get API
app.get('/', (req, res) => {
    res.send('/ GET');
});

app.listen(PORT, () => console.log(`Portfolio Express Server running on PORT: ${PORT}`));
