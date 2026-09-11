require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let database;

async function connectDatabase() {
  try {
    await client.connect();

    database = client.db("cse341-db");

    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error("Database has not been connected.");
  }

  return database;
}

module.exports = {
  connectDatabase,
  getDatabase,
};