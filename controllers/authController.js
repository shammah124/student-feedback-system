const db = require("../config/db");

// REGISTER STUDENT
exports.registerStudent = async (req, res) => {
  const { fullname, email, matric_number, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO students(fullname, email, matric_number, password)
    VALUES (?, ?, ?, ?)
`;

  db.query(
    sql,
    [fullname, email, matric_number, hashedPassword],
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
    },
  );
};

// LOGIN STUDENT
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  const sql = `
        SELECT * FROM students
        WHERE email = ?
    `;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Login error",
      });
    }

    if (result.length > 0) {
      const student = result[0];

      const isMatch = await bcrypt.compare(password, student.password);

      if (isMatch) {
        res.json({
          success: true,
          student,
        });
      } else {
        res.json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  });
};
