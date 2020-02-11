require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

router.get('/api/verify', verifyToken, (req, res) => {
  console.log('/api/verify')
  res.json({ message: 'verified' })
});

// authenticate user
router.post('/api/login', (req, res) => {
  console.log('/api/login');

  // Mock user; replace find user from db
  console.log(`req.body.username: ${req.body.username}`)
  console.log(`ACCESS_TOKEN_SECRET: ${process.env.ACCESS_TOKEN_SECRET}`)

  // get username from request body
  const username = req.body.username;

  // authenticate and serialize user with jwt
  // add expiration after being able to refresh token
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ accessToken, refreshToken });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  console.log('Verifying token...')
  //   const bearerHeader = req.headers['authorization'];
  //   console.log(`bearerHeader: ${bearerHeader}`);
  //   const token = bearerHeader && bearerHeader.split(' ')[1];
  //   console.log(`token: ${token}`);

  // something must have changed with above code where req.headers['authorization'] is now only a single string

  // get token from header
  const token = req.headers['authorization'];
  console.log(`token: ${token}`);
  if (token === 'undefined') return res.sendStatus(401);
  console.log('token is not null');
  
  // get token from header; split and select token from BEARER <access_token>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(`req.user: ${req.user}`);
    next();
  })
};

// generate an access token
function generateAccessToken(user) {
  return jwt.sigh(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'});
};

module.exports = router;