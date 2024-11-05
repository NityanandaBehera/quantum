const express = require("express");
const multer = require("multer");
const Items = require("../models/Items");
const path = require("path");

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Add new item
router.post("/items", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newItem = new Items({
      name,
      price,
      image: imagePath,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
});

// Get all items
router.get("/items", async (req, res) => {
  try {
    const items = await Items.find();

    // Map through items to add the full URL to the image path
    const updatedItems = items.map((item) => ({
      ...item.toObject(),
      image: `${req.protocol}://${req.get("host")}/${item.image}`,
    }));

    res.json(updatedItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
});

module.exports = router;
