const db = require("../config/db");

// SUBMIT COMPLAINT
exports.submitComplaint = (req, res) => {
  const { student_id, category, subject, message } = req.body;

  const sql = `
        INSERT INTO complaints
        (student_id, category, subject, message)
        VALUES (?, ?, ?, ?)
    `;

  db.query(sql, [student_id, category, subject, message], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Complaint submission failed",
      });
    }

    res.json({
      message: "Complaint submitted successfully",
    });
  });
};

// GET STUDENT COMPLAINTS
exports.getStudentComplaints = (req, res) => {
  const student_id = req.params.id;

  const sql = `
        SELECT * FROM complaints
        WHERE student_id = ?
        ORDER BY created_at DESC
    `;

  db.query(sql, [student_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch complaints",
      });
    }

    res.json(result);
  });
};
