const mongoose = require("mongoose");

async function connectToDatabase() {
  const databaseUri = process.env.MONGODB_URI;

  if (!databaseUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(databaseUri);
  console.log("Connected to MongoDB");
}

module.exports = connectToDatabase;
