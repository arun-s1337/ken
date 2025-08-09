import db from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function loginController(req, res) {
    const { emailOrUsername, password, role } = req.body;

    console.log(emailOrUsername, password, role)

    if (!emailOrUsername || !password || !role) {
        return res.status(400).json({ message: "Email/Username, password, and role are required" });
    }

    let query, identifierColumn;

    if (role === "user") {
        query = "SELECT * FROM user_signup WHERE email = ?";
        identifierColumn = "email";
    } else if (role === "admin") {
        query = "SELECT * FROM web_admin_login WHERE username = ?";
        identifierColumn = "username";
    } else {
        return res.status(400).json({ message: "Invalid role specified" });
    }

    db.query(query, [emailOrUsername], (dbError, results) => {
        if (dbError) {
            console.error("Database error:", dbError);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (compareError, passwordMatch) => {
            if (compareError) {
                console.error("Password compare error:", compareError);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const payload = {
                id: user.id,
                role,
                [identifierColumn]: user[identifierColumn]
            };

            jwt.sign(payload, JWT_SECRET, (jwtError, token) => {
                if (jwtError) {
                    console.error("JWT error:", jwtError);
                    return res.status(500).json({ message: "Internal server error" });
                }

                const userWithoutPassword = { ...user };
                delete userWithoutPassword.password;

                return res.status(200).json({
                    message: "Login successful",
                    role, // 👈 include role here
                    user: userWithoutPassword,
                    token
                });
            });
        });
    });
}




export async function createAdminUser(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const insertQuery = "INSERT INTO web_admin_login (username, password) VALUES (?, ?)";
    db.query(insertQuery, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting admin user:", err);
        return res.status(500).json({ message: "Error creating admin user" });
      }

      return res.status(201).json({
        message: "Admin user created successfully",
        adminId: result.insertId
      });
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
