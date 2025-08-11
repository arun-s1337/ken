import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = "your_jwt_secret";

export function handleAdminLogin(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({
            message: "Username and password are required"
        });
    }

    const loginQuery = "SELECT * FROM web_admin_login WHERE username = ? AND password = ?";
    
    db.query(loginQuery, [username, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const admin = results[0];
        
        jwt.sign({ id: admin.id }, JWT_SECRET, (jwtErr, token) => {
            if (jwtErr) {
                console.error("JWT error:", jwtErr);
                return res.status(500).json({ message: "Internal server error" });
            }

            return res.status(200).json({
                message: "Login successful",
                admin: { 
                    id: admin.id, 
                    username: admin.username 
                },
                token
            });
        });
    });
}