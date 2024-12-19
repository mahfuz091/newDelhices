const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // JWT expires in 1 day
  });

  res.cookie("jwt", token, {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production", // only set secure cookies in production
    sameSite: "none", // helps prevent CSRF
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Explicit expiration date: 1 day from now
    path: "/", // Make sure the cookie is available for all routes
  });
};

module.exports = generateToken;
