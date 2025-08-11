import db from "../config/db.js";

export async function getCurrentUser(req, res) {
  try {
    const userId = req.user.id;

    const [rows] =  db.query(
      'SELECT id, first_name, last_name, email, phone FROM user_signup WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}