import db from "../config/db.js";

export function handleCreateBook(req, res) {
  const bookData = req.body;

  if (!bookData.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (req.files && req.files.length > 0) {
    const imagePaths = req.files.map(file => file.path);
    bookData.images = imagePaths;
  } else {
    bookData.images = [];
  }

  const { 
    title, 
    author_detail, 
    quantity, 
    kindle, 
    audible, 
    hardcover, 
    audio_cd, 
    book_description, 
    images = [], 
    stars,
    editorial_review,
    about_author,
    source_link 
  } = bookData;

  db.query(
    `INSERT INTO book (title, author_detail, quantity, kindle, audible, hardcover, audio_cd, book_description, images, stars, editorial_review, about_author,source_link ) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title, 
      author_detail, 
      quantity, 
      kindle, 
      audible, 
      hardcover, 
      audio_cd, 
      book_description, 
      JSON.stringify(images), 
      stars,
      editorial_review,
      about_author,
      source_link 
    ],
    (error, result) => {
      if (error) {
        console.error("Error creating book:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.status(201).json({
        message: "Book created successfully",
        bookId: result.insertId,
        images: bookData.images
      });
    }
  );
}

export function handleGetAllBooks(req, res) {
  db.query(`SELECT * FROM book`, (error, rows) => {
    if (error) {
      console.error("Error fetching books:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json(rows);
  });
}

export function handleUpdateBook(req, res) {
  const bookId = req.params.id;
  const bookData = req.body;

  console.log(bookData)
  const newUploadedImages = req.files ? req.files.map(file => file.path.replace(/\\/g, '\\\\')) : [];

  

  db.query(`SELECT images FROM book WHERE id = ?`, [bookId], (error, rows) => {
    if (error) {
      console.error("Error fetching book images:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    let existingImages = [];

try {
  // Case 1: MySQL JSON column is returned as string
  if (typeof rows[0].images === 'string') {
    existingImages = JSON.parse(rows[0].images || '[]');
  } 
  // Case 2: MySQL JSON column is already parsed into an array
  else if (Array.isArray(rows[0].images)) {
    existingImages = rows[0].images;
  } 
  // Fallback for old comma-separated string values
  else {
    existingImages = String(rows[0].images || '')
      .split(',')
      .map(img => img.trim())
      .filter(Boolean);
  }
} catch (e) {
  console.error("Failed to parse images column:", e);
  existingImages = [];
}

    const maxImages = 5;
    const availableSlots = maxImages - existingImages.length;
    
    if (newUploadedImages.length > 0 && availableSlots <= 0) {
  return res.status(400).json({ 
    message: "Cannot add more images. Maximum limit of 5 images has been reached." 
  });
}
    const imagesToAdd = newUploadedImages.slice(0, availableSlots);
    const updatedImages = [...existingImages, ...imagesToAdd];
    
    if (imagesToAdd.length < newUploadedImages.length) {
      console.log(`Only ${imagesToAdd.length} out of ${newUploadedImages.length} images were added due to the 5-image limit`);
    }

    const {
      title,
      author_detail,
      quantity,
      kindle,
      audible,
      hardcover,
      audio_cd,
      book_description,
      stars,
      editorial_review,
      about_author,
      source_link
    } = bookData;

    db.query(
      `UPDATE book SET 
        title = ?, 
        author_detail = ?, 
        quantity = ?, 
        kindle = ?, 
        audible = ?, 
        hardcover = ?, 
        audio_cd = ?, 
        book_description = ?, 
        images = ?, 
        stars = ?,
        editorial_review = ?,
        about_author = ?,
        source_link = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        title,
        author_detail,
        quantity,
        kindle,
        audible,
        hardcover,
        audio_cd,
        book_description,
        JSON.stringify(updatedImages),
        parseInt(stars),
        editorial_review,
        about_author,
        source_link,
        bookId
      ],
      (error, result) => {
        if (error) {
          console.error("Error updating book:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(200).json({ 
          message: "Book updated successfully",
          imagesAdded: imagesToAdd.length,
          totalImages: updatedImages.length,
          maxImagesAllowed: maxImages
        });
      }
    );
  });
}


export function handleDeleteBook(req, res) {
  const bookId = req.params.id;
  if (!bookId) {
    return res.status(401).json({
      message: "Provide a bookId to delete"
    });
  }

  db.getConnection((err, conn) => {
    if (err) {
      console.error("Error getting database connection:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    conn.beginTransaction(err => {
      if (err) {
        conn.release();
        console.error("Error beginning transaction:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      conn.query(`DELETE FROM reviews WHERE book_id = ?`, [bookId], (error) => {
        if (error) {
          return conn.rollback(() => {
            conn.release();
            console.error("Error deleting reviews:", error);
            return res.status(500).json({ error: "Internal Server Error" });
          });
        }

        conn.query(`DELETE FROM book WHERE id = ?`, [bookId], (error, result) => {
          if (error) {
            return conn.rollback(() => {
              conn.release();
              console.error("Error deleting book:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            });
          }

          if (result.affectedRows === 0) {
            return conn.rollback(() => {
              conn.release();
              return res.status(404).json({ message: "Book not found" });
            });
          }

          conn.commit(err => {
            if (err) {
              return conn.rollback(() => {
                conn.release();
                console.error("Error committing transaction:", err);
                return res.status(500).json({ error: "Internal Server Error" });
              });
            }

            conn.release();
            return res.status(200).json({ message: "Book deleted successfully" });
          });
        });
      });
    });
  });
}



export function handleGetBookById(req, res) {
  const bookId = req.params.id;

  if (!bookId) {
    return res.status(401).json({
      message: "Provide a bookId to fetch"
    });
  }

  db.query(
    `SELECT * FROM book WHERE id = ?`,
    [bookId],
    (error, rows) => {
      if (error) {
        console.error("Error getting book:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ 
          message: "Book not found",
        });
      }

      return res.status(200).json({ 
        message: "Book fetched successfully",
        book: rows[0] 
      });
    }
  );
}


