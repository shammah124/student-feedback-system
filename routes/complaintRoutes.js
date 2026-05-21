const express = require("express");

const router = express.Router();

const complaintController = require("../controllers/complaintController");

// SUBMIT COMPLAINT
router.post("/submit", complaintController.submitComplaint);

// GET STUDENT COMPLAINTS
router.get("/student/:id", complaintController.getStudentComplaints);

module.exports = router;
