const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

// ADMIN LOGIN
router.post("/login", adminController.adminLogin);

// GET ALL COMPLAINTS
router.get("/complaints", adminController.getAllComplaints);

router.put("/complaints/:id", adminController.respondToComplaint);

module.exports = router;
