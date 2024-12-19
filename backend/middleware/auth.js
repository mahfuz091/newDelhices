const jwt = require("jsonwebtoken");
const User = require("../models/User");

// auth
const auth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(503).json({ msg: "Invalid Token" });
    }
  } else {
    res.status(503).json({ msg: "User Unauthorized" });
  }
};
const guest = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by userId in the token and attach to the request
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return res.status(503).json({ msg: "Invalid Token" });
    }
  } else {
    // If no token, treat as guest user and allow next middleware
    req.user = null; // Setting req.user to null for guest users
    next();
  }
};

// admin
const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(503).json({ msg: "User is not admin" });
  }
};

module.exports = { auth, admin, guest };
