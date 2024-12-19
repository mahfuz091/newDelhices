const express = require("express");
const DrinkAndFries = require("../models/DrinkAndFries");
const { auth, admin } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/assets/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// CREATE (POST)
router.post("/", auth, admin, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required." });
  }
  const image = path.basename(req.file.path);
  try {
    const { title, price } = req.body;
    const drinkNFries = new DrinkAndFries({ image, title, price });
    await drinkNFries.save();
    res.status(201).json(drinkNFries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ALL (GET)
router.get("/", async (req, res) => {
  try {
    const drinkNFries = await DrinkAndFries.find().sort({ createdAt: -1 });
    res.status(200).json(drinkNFries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE (GET by ID)
router.get("/:id", async (req, res) => {
  try {
    const drinkNFries = await DrinkAndFries.findById(req.params.id);
    if (!drinkNFries)
      return res.status(404).json({ message: "DrinkAndFries not found" });
    res.status(200).json(drinkNFries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE (PUT)
router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const drinkNFries = await DrinkAndFries.findById(req.params.id);

    if (!drinkNFries) {
      return res.status(404).json({ message: "DrinkAndFries not found" });
    }

    let imagePath = drinkNFries.image; // Use the old image if no new image is uploaded

    if (req.file) {
      imagePath = path.basename(req.file.path); // Update to new image path
    }

    // Update drinkNFries details
    drinkNFries.title = req.body.title || drinkNFries.title; // Only update if a new name is provided
    drinkNFries.price = req.body.price || drinkNFries.price;
    drinkNFries.image = imagePath; // Update image path if a new image is uploaded

    // Save updated drinkNFries
    const updateddrinkNFries = await drinkNFries.save();

    // Optionally, track who updated the drinkNFries
    if (!drinkNFries)
      return res.status(404).json({ message: "DrinkAndFries not found" });

    res.status(200).json(updateddrinkNFries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const drinkNFries = await DrinkAndFries.findByIdAndDelete(req.params.id);
    if (!drinkNFries)
      return res.status(404).json({ message: "DrinkAndFries not found" });
    res.status(200).json({ message: "DrinkAndFries deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
