const express = require("express");
const Category = require("../models/Category");
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

// POST a category
router.post("/", auth, admin, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required." });
  }
  const imagePath = path.basename(req.file.path);
  try {
    const newCategory = new Category({
      image: imagePath,
      name: req.body.name,
      createdBy: req.user._id,
    });

    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET all category
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE item by ID
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const deletedItem = await Category.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category deleted successfully", deletedItem });
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE category by ID (with file upload)
router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  // console.log(req.body);

  try {
    // Find the category by ID
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // If an image is uploaded, update the image path
    let imagePath = category.image; // Use the old image if no new image is uploaded

    if (req.file) {
      imagePath = path.basename(req.file.path); // Update to new image path
    }

    // Update category details
    category.name = req.body.name || category.name; // Only update if a new name is provided
    category.image = imagePath; // Update image path if a new image is uploaded
    category.updatedBy = req.user._id;
    // Optionally, track who updated the category

    // Save updated category
    const updatedCategory = await category.save();

    // Respond with the updated category
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(400).json({ message: "Error updating category" });
  }
});

module.exports = router;
