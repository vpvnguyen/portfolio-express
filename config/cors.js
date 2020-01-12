require('dotenv').config();

const corsOptions = {
    origin: process.env.DEV_LOCALHOST, // DEV_IP || PROD_IP - edit .env as well
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  module.exports = corsOptions;