const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const connectMongoDB = () => {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`
    MongoDB connected to: ${MONGODB_URI}
    `);
} 

module.exports = connectMongoDB;