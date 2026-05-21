const db = require("../config/db");

// ADMIN LOGIN
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  const sql = `
        SELECT * FROM admins
        WHERE username = ? AND password = ?
    `;

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Login failed",
      });
    }

    if (result.length > 0) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  });
};

// GET ALL COMPLAINTS
exports.getAllComplaints = (req, res) => {
  const sql = `
    SELECT
        complaints.*,
        students.fullname,
        students.matric_number
    FROM complaints
    INNER JOIN students
    ON complaints.student_id = students.id
`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch complaints",
      });
    }

    res.json(result);
  });
};
exports.respondToComplaint = (req, res) => {
  const complaintId = req.params.id;

  const { status, admin_response } = req.body;

  const sql = `
        UPDATE complaints
        SET status = ?, admin_response = ?
        WHERE id = ?
    `;

  db.query(sql, [status, admin_response, complaintId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update complaint",
      });
    }

    res.json({
      message: "Complaint updated successfully",
    });
  });
};
