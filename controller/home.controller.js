const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/api/login', (req, res) => {
    // create mock user for now
    const user = {
        id: 1,
        username: 'vpvnguyen',
        email: 'vpvnguyen@gmail.com',
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({ token });
    });
});

module.exports = router;