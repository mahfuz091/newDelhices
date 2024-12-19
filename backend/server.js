const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const TableConfig = require("./models/TableConfig");
const { connect } = require("./config/db");
const tableRoutes = require("./routes/tableRoute");
const categoryRoute = require("./routes/categoryRoute");
const itemRoute = require("./routes/itemRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const blogRoute = require("./routes/blogRoute");
const contactRoute = require("./routes/contactRoute");
const sauceRoute = require("./routes/sauceRoute");
const nanSauceRoute = require("./routes/nanSauceRoute");
const drinkNFriesRoute = require("./routes/drinkNFriesRoute");
const cors = require("cors");

dotenv.config();

const app = express();
connect();
app.use(
  cors({
    origin: process.env.FONTEND,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // specify allowed headers if needed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json("App is running");
});

// routes
app.use("/api/table", tableRoutes);
app.use("/api/category", categoryRoute);
app.use("/api/items", itemRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);
app.use("/api/sauce", sauceRoute);
app.use("/api/nansauce", nanSauceRoute);
app.use("/api/drinkNFries", drinkNFriesRoute);

const PORT = process.env.PORT || 4000;

async function initializeConfig() {
  const configExists = await TableConfig.findOne();
  if (!configExists) {
    await new TableConfig({ maxTablesPerDay: 10 }).save(); // Default to 10 tables per day
  }
}

initializeConfig().catch((error) => {
  console.error("Error initializing configuration:", error.message);
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
