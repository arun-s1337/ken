import db from "../config/db.js";

// ADD YOUTUBE VIDEO
export const addYoutubeHandler = (req, res) => {
  const { title, yotubelLink } = req.body;

  console.log(req.body);
  console.log(title, yotubelLink);

  const adminId = req.adminId;

  if (!title || !yotubelLink) {
    return res.status(400).json({ message: "Title and link are required." });
  }

  db.query(
    `INSERT INTO youtube_video (title, yotubelLink, admin_id) VALUES (?, ?, ?)`,
    [title, yotubelLink, adminId],
    (err, result) => {
      if (err) {
        console.error("Add YouTube error.", err);
        res.status(500).json({ message: "Database Error" });
      } else {
        res.status(201).json({ message: "Video added.", id: result.insertId });
      }
    }
  );
};


// GET YOUTUBE VIDEOS
export const getYoutubeVideosHandler = (req, res) => {
  db.query(
    `SELECT id, title, yotubelLink, created_at, updated_at FROM youtube_video ORDER BY created_at DESC`,
    (err, result) => {
      if (err) {
        console.error("Get YouTube error.", err);
        res.status(500).json({ message: "Database Error" });
      } else {
        res.status(200).json({ videos: result });
      }
    }
  );
};


// REMOVE YOUTUBE VIDEO
export const deleteYoutubeVideoHandler = (req, res) => {
  const { youtubeId } = req.params;
  const adminId = req.adminId;

  db.query(
    `DELETE FROM youtube_video WHERE id = ? AND admin_id = ?`,
    [youtubeId, adminId],
    (err, result) => {
      if (err) {
        console.error("Delete YouTube error.", err);
        res.status(500).json({ message: "Database Error" });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ message: "Video deleted." });
      } else {
        res.status(404).json({ message: "Video not found or not authorized." });
      }
    }
  );
};

