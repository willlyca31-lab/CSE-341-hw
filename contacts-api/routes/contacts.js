const express = require("express");

const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contacts");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getContactById);

router.post("/", createContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

module.exports = router;