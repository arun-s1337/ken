import db from "../config/db.js";


export const addTestimonialHandler = (req, res) => {
  const { patient_name, content } = req.body;
  const adminId = req.adminId;

  if (!patient_name || !content) {
    return res.status(400).json({ message: "Patient name and content are required." });
  }

  db.query(
    `INSERT INTO testimonial (admin_id, patient_name, content, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`,
    [adminId, patient_name, content],
    (err, result) => {
      if (err) {
        console.error("Add Testimonial error.", err);
        res.status(500).json({ message: "Database Error" });
      } else if (result.affectedRows > 0) {
        res.status(200).json({ message: "Testimonial Added Successfully" });
      } else {
        res.status(400).json({ message: "Unable to add Testimonial" });
      }
    }
  );
};



export const getTestimonialsHandler = (req, res) => {
  db.query(
    `SELECT * FROM testimonial ORDER BY created_at DESC`,
    (err, result) => {
      if (err) {
        console.error("Get Testimonial error.", err);
        res.status(500).json({ message: "Database Error" });
      } else if (result.length === 0) {
        res.status(200).json({ message: "No testimonials found." });
      } else {
        res.status(200).json({ message: "Fetched testimonials.", testimonials: result });
      }
    }
  );
};

