import db from "../config/db.js"

export async function createReview({name,content,stars,bookId,country}){
    const [ result ]  =  db.execute(
        ` INSERT INTO reviews(name,content,stars,book_id,country) VALUES (?,?,?,?,?)`,
    [name,content,stars,bookId,country]
    )

    return result.affectedRows > 0
}

export async function getReviews({ bookId }) {
    const [ result ] = db.execute(
        `SELECT * FROM reviews where book_id= ?`,
        [bookId]
    )

    return result
}