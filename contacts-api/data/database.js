const { MongoClient } = require("mongodb");

let database;

const connectDatabase = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    database = client.db(process.env.DATABASE_NAME);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database is not connected.");
  }

  return database;
};

module.exports = {
  connectDatabase,
  getDatabase
};