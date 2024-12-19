const express = require("express");
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message, phone } = req.body;

  console.log("Request Body:", req.body); // Log request body for debugging

  if (!name || !email || !message || !phone) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Save to MongoDB
    const newContact = new Contact({ name, email, message, phone });
    await newContact.save();

    // Send email using Nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD,
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, // Use app-specific password
      },
    });

    const mailOptions = {
      to: email,
      subject: `Contact Form Submission from ${name}`,
      text: `
        You have received a new contact form submission:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent and saved to database successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your request.");
  }
});

module.exports = router;
