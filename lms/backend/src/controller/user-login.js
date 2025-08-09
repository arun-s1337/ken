import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function loginUserController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Step 1: Find user by email
    db.query(
        "SELECT * FROM user_signup WHERE email = ?",
        [email],
        (dbError, results) => {
            if (dbError) {
                console.error("Database error:", dbError);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "User not found" });
            }

            const user = results[0];

            // Step 2: Compare passwords
            bcrypt.compare(password, user.password, (compareError, passwordMatch) => {
                if (compareError) {
                    console.error("Password compare error:", compareError);
                    return res.status(500).json({ message: "Internal server error" });
                }

                if (!passwordMatch) {
                    return res.status(401).json({ message: "Invalid password" });
                }

                // Step 3: Generate JWT token
                jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    (jwtError, token) => {
                        if (jwtError) {
                            console.error("JWT error:", jwtError);
                            return res.status(500).json({ message: "Internal server error" });
                        }

                        // Remove password before sending user data
                        const userWithoutPassword = { ...user };
                        delete userWithoutPassword.password;

                        return res.status(200).json({
                            message: "Login successful",
                            user: userWithoutPassword,
                            token
                        });
                    }
                );
            });
        }
    );
}