require("dotenv").config();

const fs = require("fs");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

async function importContacts() {
  try {
    await client.connect();

    const db = client.db("cse341-db");
    const contacts = JSON.parse(
      fs.readFileSync("./data/contacts.json", "utf8")
    );

    const collection = db.collection("contacts");

    await collection.deleteMany({});
    const result = await collection.insertMany(contacts);

    console.log(`${result.insertedCount} contacts imported successfully.`);
  } catch (error) {
    console.error("Import error:", error);
  } finally {
    await client.close();
  }
}

importContacts();