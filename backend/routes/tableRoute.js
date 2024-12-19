const express = require("express");
const Table = require("../models/Table");
const TableConfig = require("../models/TableConfig");
const { auth, admin } = require("../middleware/auth");
const nodemailer = require("nodemailer");

const router = express.Router();

// Reserve Table - POST
router.post("/", async (req, res) => {
  const {
    date,
    hour,
    peopleCount,
    email,
    fname,
    lname,
    phone,
    address,
    comment,
  } = req.body;

  try {
    // Fetch the configuration to get the current maxTablesPerDay value
    const config = await TableConfig.findOne();
    const maxTablesPerDay = config ? config.maxTablesPerDay : 10; // Default to 10 if no config is found

    // Check the total reservations for the given date
    const reservationsCount = await Table.countDocuments({ date });

    if (reservationsCount >= maxTablesPerDay) {
      return res
        .status(403)
        .json({ message: "No tables available for the selected date." });
    }

    // Create a new reservation if the limit hasn't been reached
    const newTable = new Table({
      date,
      hour,
      peopleCount,
      email,
      fname,
      lname,
      phone,
      address,
      comment,
    });

    const savedTable = await newTable.save();

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

      subject: `Reservation Confirmation`,
      text: `Dear ${fname},\n\nYour reservation has been successfully placed. Here are the details:\n\nReserve ID: ${savedTable._id}\nReservation Time: ${hour}\nReservation Date: ${date}\n\nThank you for your reservation!\n\nBest regards,\nNew Delhices Restaurant`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(savedTable);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating reservation", error: error.message });
  }
});

// Reserve Table - GET (admin access only)
router.get("/", auth, admin, async (req, res) => {
  try {
    const tableData = await Table.find({}).sort({ createdAt: -1 }); // Sort by date in ascending order
    res.status(200).json(tableData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reservations", error: error.message });
  }
});

// DELETE /api/table/:id - Delete a reservation by ID
router.delete("/:id", auth, admin, async (req, res) => {
  const reserveId = req.params.id;

  try {
    const deletedReservation = await Table.findByIdAndDelete(reserveId);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({
      message: "Reservation deleted succes sfully",
      deletedReservation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting reservation", error: error.message });
  }
});

// Update max tables per day - PUT /api/config/max-tables
router.put("/max-tables", auth, admin, async (req, res) => {
  const { maxTablesPerDay } = req.body;

  // Ensure maxTablesPerDay is a valid number
  if (typeof maxTablesPerDay !== "number") {
    return res.status(400).json({
      message: "Invalid input: maxTablesPerDay must be a number",
    });
  }

  try {
    let config = await TableConfig.findOne();

    if (!config) {
      config = new TableConfig({ maxTablesPerDay });
    } else {
      config.maxTablesPerDay = maxTablesPerDay;
    }

    const savedConfig = await config.save();
    res.status(200).json({
      message: "Table Configuration updated successfully",
      maxTablesPerDay: savedConfig.maxTablesPerDay,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating table configuration",
      error: error.message,
    });
  }
});
router.get("/max-tables", auth, admin, async (req, res) => {
  try {
    const maxTable = await TableConfig.find({});
    res.status(200).json(maxTable);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reservations", error: error.message });
  }
});

module.exports = router;
