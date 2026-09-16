
const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const { connectDatabase } = require("./db/connect");
const contactsRoutes = require("./routes/contacts");
const swaggerDocument = require("./swagger/swagger.json");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Contacts API routes
app.use("/contacts", contactsRoutes);

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Contacts API is running.");
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Start the server after connecting to MongoDB
async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();