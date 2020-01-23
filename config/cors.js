require('dotenv').config();

// configure cors for specific routes
const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  };

  module.exports = corsOptions;