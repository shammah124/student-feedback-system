const db = require("../config/db");

// REGISTER STUDENT
exports.registerStudent = (req, res) => {

  const { fullname, email, matric_number, password } = req.body;

  const sql = `
    INSERT INTO students(fullname, email, matric_number, password)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [fullname, email, matric_number, password],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Registration failed",
        });
      }

      res.json({
        message: "Registration successful",
      });
    }
  );
};

// LOGIN STUDENT
exports.loginStudent = (req, res) => {

  const { email, password } = req.body;

  const sql = `
    SELECT * FROM students
    WHERE email = ? AND password = ?
  `;

  db.query(
    sql,
    [email, password],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          message: "Login error",
        });
      }

      if (result.length > 0) {

        res.json({
          success: true,
          student: result[0],
        });

      } else {

        res.json({
          success: false,
          message: "Invalid email or password",
        });
      }
    }
  );
};
