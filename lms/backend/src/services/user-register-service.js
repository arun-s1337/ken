import db from "../config/db.js";
import bcrypt from "bcrypt";

export async function registerUser(registerData) {
    const { first_name, last_name, email, phone, password } = registerData;

    try {
        const existingUserQuery = "SELECT * FROM user_signup WHERE email = ?";
        const [existingUserResult] = db.query(existingUserQuery, [email]);

        if (existingUserResult.length > 0) {
            throw new Error("User already exists with this email.");
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const insertQuery = `
            INSERT INTO user_signup (first_name, last_name, email, phone, password)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] =  db.query(insertQuery, [
            first_name,
            last_name,
            email,
            phone,
            hashedPassword
        ]);

        return {
            id: result.insertId,
            first_name,
            last_name,
            email,
            phone
        };
    } catch (error) {
        throw error;
    }
}
