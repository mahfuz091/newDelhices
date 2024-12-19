const express = require("express");
const Sauce = require("../models/Sauce");
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
    const sauce = new Sauce({ image, title, price });
    await sauce.save();
    res.status(201).json(sauce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ALL (GET)
router.get("/", async (req, res) => {
  try {
    const sauces = await Sauce.find().sort({ createdAt: -1 });
    res.status(200).json(sauces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE (GET by ID)
router.get("/:id", async (req, res) => {
  try {
    const sauce = await Sauce.findById(req.params.id);
    if (!sauce) return res.status(404).json({ message: "Sauce not found" });
    res.status(200).json(sauce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE (PUT)
router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const sauce = await Sauce.findById(req.params.id);

    if (!sauce) {
      return res.status(404).json({ message: "Sauce not found" });
    }

    let imagePath = sauce.image; // Use the old image if no new image is uploaded

    if (req.file) {
      imagePath = path.basename(req.file.path); // Update to new image path
    }

    // Update sauce details
    sauce.title = req.body.title || sauce.title; // Only update if a new name is provided
    sauce.price = req.body.price || sauce.price;
    sauce.image = imagePath; // Update image path if a new image is uploaded

    // Save updated sauce
    const updatedsauce = await sauce.save();

    // Optionally, track who updated the sauce
    if (!sauce) return res.status(404).json({ message: "Sauce not found" });

    res.status(200).json(updatedsauce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const sauce = await Sauce.findByIdAndDelete(req.params.id);
    if (!sauce) return res.status(404).json({ message: "Sauce not found" });
    res.status(200).json({ message: "Sauce deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
