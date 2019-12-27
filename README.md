# portfolio-express

Setting up a data API backend in Node.js using Express.js Framework.

## Setup Express
1. Create a repo and initialize npm
`npm init -y`
2. cd into project dir and install Express.js
`npm i express`
3. Create server.js in root
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

...

app.listen((PORT, () => console.log(PORT)));
```
4. Test that Express server is running
`node server.js`

## Setup MongoDB
1. If macOS, install mongoDB using brew. Tap the MongoDB Homebrew Tap.
`brew tap mongodb/brew`
2. Install MongoDB
`brew install mongodb-community@4.2`
> this uses version 4.2, check mongodb for latest release
3. Run MongoDB
`brew services start mongodb-community@4.2`

4. Verify MongoDB is running
`ps aux | grep -v grep | grep mongod`

5. Create Database in terminal
```
mongo
use <db_name>
db.collection.insert({"key":"value"})
```