const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017")
    // .connect(process.env.MONGODB)
    .then(() => console.log("CONNECTED BD"))
    .catch(() => console.log("ERROR CONNECT"));
};

module.exports = connectDB;
