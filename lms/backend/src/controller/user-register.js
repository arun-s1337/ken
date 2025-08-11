import db from "../config/db.js";
import bcrypt from "bcrypt";

export function registerUserController(req, res) {
    const { first_name, last_name, email, phone, password } = req.body;

    

    // First check if user exists
    db.query(
        "SELECT * FROM user_signup WHERE email = ?", 
        [email],
        (error, existingUsers) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({
                    message: "Internal server error"
                });
            }

            if (existingUsers.length > 0) {
                return res.status(400).json({
                    message: "User already exists with this email."
                });
            }

            // Hash the password
            bcrypt.hash(password, 10, (hashError, hashedPassword) => {
                if (hashError) {
                    console.error("Password hashing error:", hashError);
                    return res.status(500).json({
                        message: "Internal server error"
                    });
                }

                // Insert new user
                db.query(
                    `INSERT INTO user_signup 
                    (first_name, last_name, email, phone, password)
                    VALUES (?, ?, ?, ?, ?)`,
                    [first_name, last_name, email, phone, hashedPassword],
                    (insertError, result) => {
                        if (insertError) {
                            console.error("Insert error:", insertError);
                            return res.status(500).json({
                                message: "Failed to register user"
                            });
                        }

                        return res.status(201).json({
                            message: "User registered successfully",
                            user: {
                                id: result.insertId,
                                first_name,
                                last_name,
                                email,
                                phone
                            }
                        });
                    }
                );
            });
        }
    );
}