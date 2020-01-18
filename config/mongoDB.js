const mongoose = require("mongoose");

const connectMongoDB = MONGODB_URI => {

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("error", () => console.log(`${MONGODB_URI}> error occurred from the database`));
  mongoose.connection.once("open", () => console.log(`${MONGODB_URI}> successfully opened the database`));
};

module.exports = connectMongoDB;
