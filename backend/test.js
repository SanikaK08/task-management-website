const mongoose = require("mongoose");

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

require("dotenv").config();
test();