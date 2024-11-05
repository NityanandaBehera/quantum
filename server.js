const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

const app = express();
const PORT = 8000;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const itemRoutes = require("./routes/itemRoutes");
app.use("/ecom-api", itemRoutes);
