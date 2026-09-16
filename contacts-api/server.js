const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const { connectDatabase } = require("./data/database");
const routes = require("./routes");
const swaggerDocument = require("./swagger.json");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get("/", (req, res) => {
  res.send("Contacts API is running.");
});

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Swagger: http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
};

startServer();