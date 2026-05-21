const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/register.html", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
});

app.get("/login.html", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(__dirname + "/views/dashboard.html");
});

app.get("/complaint.html", (req, res) => {
  res.sendFile(__dirname + "/views/complaint.html");
});

app.get("/track.html", (req, res) => {
  res.sendFile(__dirname + "/views/track.html");
});

app.get("/admin-login.html", (req, res) => {
  res.sendFile(__dirname + "/views/admin-login.html");
});

app.get("/admin-dashboard.html", (req, res) => {
  res.sendFile(__dirname + "/views/admin-dashboard.html");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
