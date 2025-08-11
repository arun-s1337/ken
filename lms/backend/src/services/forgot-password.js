import bcrypt from "bcrypt"
import db from "../config/db.js";

const resetPassword = async (email, newPassword) => {
  const [user] = db.query("SELECT * FROM user_signup WHERE email = ?", [email]);

  if (user.length === 0) {
    throw new Error("User not found with this email.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.query(
    "UPDATE user_signup SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?",
    [hashedPassword, email]
  );
};

export default resetPassword