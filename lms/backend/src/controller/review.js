import db from "../config/db.js";

export function addReviewHandler(req, res) {
    const adminId = req.adminId;
    const { name, content, stars, country, bookId } = req.body;

    if (!adminId) {
        return res.status(400).json({
            message: "Unauthorized"
        });
    }

    db.query(
        `INSERT INTO reviews(name, content, stars, book_id, country) VALUES (?, ?, ?, ?, ?)`,
        [name, content, stars, bookId, country],
        (error, result) => {
            if (error) {
                console.error('Create review error', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({
                    message: "Cannot able to create review"
                });
            }

            res.status(200).json({
                message: "Review added successfully"
            });
        }
    );
}

export function getReviewsHandler(req, res) {
    const { bookId } = req.params;

    if (!bookId) {
        return res.status(400).json({
            message: "Need BookId for fetching"
        });
    }

    db.query(
        `SELECT * FROM reviews WHERE book_id = ?`,
        [bookId],
        (error, results) => {
            if (error) {
                console.error("Can't able to fetch reviews:", error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "No Reviews to fetch"
                });
            }

            res.status(200).json({
                message: "Reviews Fetched Successfully",
                reviews: results
            });
        }
    );
}