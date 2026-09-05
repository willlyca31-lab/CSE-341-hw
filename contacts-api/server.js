require("dotenv").config();

const express = require("express");
const { connectToDatabase } = require("./db/connect");
const contactsRoutes = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Contacts API is running");
});

// Contacts routes
app.use("/contacts", contactsRoutes);

// Connect to MongoDB and start server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });