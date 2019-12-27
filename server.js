const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// handle url encoded data; parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public static
app.use(express.static('public'));

// test get API
app.get('/', (req, res) => {
    res.send('/ GET');
});

app.listen(PORT, () => console.log(`Portfolio Express Server running on PORT: ${PORT}`));
