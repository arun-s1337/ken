import db from "../config/db.js";

export async function saveContactMessage(full_name,email,message){
    const query = `INSERT INTO contact_form (full_name, email, message) VALUES (?, ?, ?)`;
    const [result] = await db.execute(query, [full_name, email, message]);
    return result;
}

export async function getContactMessages() {
    const query = `SELECT id, full_name, email, message FROM contact_form ORDER BY id DESC`;
    const [rows] = await db.execute(query);
    return rows;
}

