import db from "../config/db.js";

export async function createBook(bookData) {
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
  } = bookData;

  const [result] = await db.execute(
    `INSERT INTO book (title, author_detail, quantity, kindle, audible, hardcover, audio_cd, book_description, images, stars,editorial_review,about_author) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
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
      about_author
    ]
  );

  return result;
}

export async function getBooks(){
    const [rows] = await db.query(`SELECT * FROM book`);
    

    return rows;
}

export async function updateBook(bookId, bookData) {
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
    editorial_review,
    about_author
  } = bookData;

  const [result] = await db.execute(
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
      editorial_review = ?,
      about_author = ?,
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
      JSON.stringify(images),
      editorial_review,
      about_author,
      bookId
    ]
  );

  return result;
}



export async function deleteBook(bookId) {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        
        await conn.execute(`DELETE FROM reviews WHERE book_id = ?`, [bookId]);

        
        const [result] = await conn.execute(`DELETE FROM book WHERE id = ?`, [bookId]);

        await conn.commit();
        return result;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

export async function getBookById(bookId) {
  const [rows] = await db.execute(
    `SELECT * FROM book WHERE id = ?`,
    [bookId]
  );

  return rows[0]; 
}
