const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

const collectionName = "contacts";

// GET all contacts
async function getAllContacts(req, res) {
  try {
    const db = getDatabase();

    const contacts = await db
      .collection(collectionName)
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "An error occurred while getting contacts.",
    });
  }
}

// GET contact by ID
async function getContactById(req, res) {
  try {
    const db = getDatabase();

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid contact ID.",
      });
    }

    const contact = await db
      .collection(collectionName)
      .findOne({
        _id: new ObjectId(id),
      });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "An error occurred while getting the contact.",
    });
  }
}

// POST new contact
async function createContact(req, res) {
  try {
    const db = getDatabase();

    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await db
      .collection(collectionName)
      .insertOne(newContact);

    res.status(201).json({
      id: result.insertedId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "An error occurred while creating the contact.",
    });
  }
}

// PUT update contact
async function updateContact(req, res) {
  try {
    const db = getDatabase();

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid contact ID.",
      });
    }

    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await db
      .collection(collectionName)
      .replaceOne(
        { _id: new ObjectId(id) },
        updatedContact
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "An error occurred while updating the contact.",
    });
  }
}

// DELETE contact
async function deleteContact(req, res) {
  try {
    const db = getDatabase();

    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid contact ID.",
      });
    }

    const result = await db
      .collection(collectionName)
      .deleteOne({
        _id: new ObjectId(id),
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "An error occurred while deleting the contact.",
    });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};