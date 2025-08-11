import db from "../config/db.js";

export async function saveBlogData(first_name,email,message,website){
    const query = `INSERT INTO blog_form (first_name, email, message, website) VALUES (?, ?, ?,?)`;
    const [result] = await db.execute(query, [first_name, email, message, website]);
    return result;
}

export async function getBlogData(){
    const query = `SELECT id, first_name, email, message, website FROM blog_form ORDER BY id DESC`;
    const [rows] = await db.execute(query);
    return rows;
}