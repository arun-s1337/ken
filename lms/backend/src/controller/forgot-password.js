import bcrypt from "bcrypt";
import db from "../config/db.js";

export function handleForgotPassword(req, res) {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required." });
  }


  db.query("SELECT * FROM user_signup WHERE email = ?", [email], (error, users) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found with this email." });
    }

   
    bcrypt.hash(newPassword, 10, (hashError, hashedPassword) => {
      if (hashError) {
        console.error("Password hashing error:", hashError);
        return res.status(500).json({ message: "Internal Server Error" });
      }

     
      db.query(
        "UPDATE user_signup SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?",
        [hashedPassword, email],
        (updateError) => {
          if (updateError) {
            console.error("Password update error:", updateError);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          return res.status(200).json({ message: "Password reset successfully." });
        }
      );
    });
  });
}