import db from "../config/db.js";

export async function addYoutube({ title, yotubelLink, adminId }) {
  const [result] = db.query(
    `INSERT INTO youtube_video (title, yotubelLink, admin_id) VALUES (?, ?, ?)`,
    [title, yotubelLink, adminId]
  );
  return result.insertId;
}

export async function getYoutubeVideos() {
  const [rows] = db.query(
    `SELECT id, title, yotubelLink, created_at, updated_at 
     FROM youtube_video
     ORDER BY created_at DESC`,
  );
  return rows;
}

export async function deleteYoutubeVideo({ youtubeId, adminId }) {
  const [result] = db.query(
    `DELETE FROM youtube_video WHERE id = ? AND admin_id = ?`,
    [youtubeId, adminId]
  );
  return result.affectedRows > 0;
}