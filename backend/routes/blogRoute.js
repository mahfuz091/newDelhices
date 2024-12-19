const express = require("express");
const Blog = require("../models/Blog");
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
    const { title, description } = req.body;
    const blog = new Blog({ image, title, description });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ALL (GET)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE (GET by ID)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE (PUT)
router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let imagePath = blog.image; // Use the old image if no new image is uploaded

    if (req.file) {
      imagePath = path.basename(req.file.path); // Update to new image path
    }

    // Update blog details
    blog.title = req.body.title || blog.title; // Only update if a new name is provided
    blog.description = req.body.description || blog.description;
    blog.image = imagePath; // Update image path if a new image is uploaded

    // Save updated blog
    const updatedblog = await blog.save();

    // Optionally, track who updated the blog
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(updatedblog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
