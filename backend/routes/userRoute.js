const express = require("express");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const { auth, admin } = require("../middleware/auth");

const router = express.Router();

// Register user
router.post("/", async (req, res) => {
  const { firstName, lastName, number, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(409).json({ msg: "User Already Exists" });
  } else {
    // Hash the password before saving

    const user = await User.create({
      firstName,
      lastName,
      number,
      email,
      password,
      isAdmin,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        number: user.number,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400).json({ msg: "Something went wrong" });
    }
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ msg: "Invalid Email or Password" });
  }
});

// logout user
router.post("/logout", async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false,
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({ msg: "User Logged Out" });
});

// Get self profile
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // Exclude password from the response

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      number: user.number,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ msg: "User not found" });
  }
});

// Get all users (admin only)
router.get("/", auth, admin, async (req, res) => {
  const users = await User.find({}).select("-password"); // Exclude passwords
  res.json(users);
});

// Delete user (admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    // Find and delete user by ID
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
