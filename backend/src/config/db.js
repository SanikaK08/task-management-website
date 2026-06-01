const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Added family: 4 option to force Node.js to use IPv4 instead of IPv6
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;