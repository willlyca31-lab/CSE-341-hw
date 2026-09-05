const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

function getDb() {
  return db;
}

module.exports = {
  connectToDatabase,
  getDb
};