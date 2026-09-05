const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

// GET all contacts
async function getAll(req, res) {
  try {
    const contacts = await getDb()
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({
      error: "Failed to get contacts"
    });
  }
}

// GET one contact by ID
async function getSingle(req, res) {
  try {
    const id = new ObjectId(req.params.id);

    const contact = await getDb()
      .collection("contacts")
      .findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found"
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error getting contact:", error);

    res.status(400).json({
      error: "Invalid contact ID"
    });
  }
}

module.exports = {
  getAll,
  getSingle
};