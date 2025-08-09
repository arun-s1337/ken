import db from "../config/db.js";

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  const loginQuery = "SELECT * FROM web_admin_login WHERE username = ? AND password = ?";
  
  db.query(loginQuery, [username, password], (err, result) => {
    if (err) {
      console.log("error", err);
      res.json({ message: "db_error" });
    } else if (result.length > 0) {
      res.status(200).json({ success: true, admin: result[0] });
    } else {
      res.status(200).json({ success: false, message: "Invalid credentials" });
    }
  });
};

