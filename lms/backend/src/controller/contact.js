import { isValidEmail } from "../utils/validator.js";
import { sendEmailListEmail, sendThankYouEmail } from "../utils/sendEmail.js";
import db from "../config/db.js";

export function handleContactForm(req, res) {
    const { full_name, email, message } = req.body;

    
    if (!full_name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: "Invalid email format." });
    }

    if (message.length < 10) {
        return res.status(400).json({ success: false, error: "Message should be at least 10 characters long." });
    }

    
    db.query(
        `INSERT INTO contact_form (full_name, email, message) VALUES (?, ?, ?)`,
        [full_name, email, message],
        (error, result) => {
            if (error) {
                console.error("Contact form error:", error);
                return res.status(500).json({ success: false, error: "Internal server error." });
            }

            
            sendThankYouEmail(email, full_name)
                
                
           return res.status(200).json({ 
                    success: true, 
                    message: "Form submitted successfully." 
            });
        }
    );
}




export function handleGetContacts(req, res) {
    db.query(
        `SELECT id, full_name, email, message FROM contact_form ORDER BY id DESC`,
        (error, rows) => {
            if (error) {
                console.error("Get contacts error:", error);
                return res.status(500).json({ 
                    success: false, 
                    error: "Unable to fetch messages." 
                });
            }

            return res.status(200).json({ 
                success: true, 
                data: rows 
            });
        }
    );
}



export function handleEmailContactForm(req, res) {
    const { first_name, last_name, email } = req.body;

    // Validation checks
    if (!first_name || !email || !last_name) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: "Invalid email format." });
    }

    // Save to database
    db.query(
        `INSERT INTO email_form (first_name, last_name, email) VALUES (?, ?, ?)`,
        [first_name, last_name, email],
        (error, result) => {
            if (error) {
                console.error("Email form error:", error);
                return res.status(500).json({ 
                    success: false, 
                    error: "Internal server error." 
                });
            }

         
            sendEmailListEmail(email)
                
                
           return res.status(200).json({ 
                    success: true, 
                    message: "Form submitted successfully." 
            });
        }
    );
}

export function handleGetEmailContacts(req, res) {
    db.query(
        `SELECT id, first_name, last_name, email FROM email_form ORDER BY id DESC`,
        (error, rows) => {
            if (error) {
                console.error("Get email contacts error:", error);
                return res.status(500).json({ 
                    success: false, 
                    error: "Unable to fetch messages." 
                });
            }

            return res.status(200).json({ 
                success: true, 
                data: rows 
            });
        }
    );
}

export function handleBlogForm(req, res) {
    const { first_name, email, website, message } = req.body;

  
    if (!first_name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, error: "Invalid email format." });
    }

    if (message.length < 10) {
        return res.status(400).json({ success: false, error: "Message should be at least 10 characters long." });
    }

    // Save to database
    db.query(
        `INSERT INTO blog_form (first_name, email, message, website) VALUES (?, ?, ?, ?)`,
        [first_name, email, message, website || null],
        (error, result) => {
            if (error) {
                console.error("Blog form error:", error);
                return res.status(500).json({ 
                    success: false, 
                    error: "Internal server error." 
                });
            }

            return res.status(200).json({ 
                success: true, 
                message: "Form submitted successfully." 
            });
        }
    );
}

export function handleGetBlogData(req, res) {
    db.query(
        `SELECT id, first_name, email, message, website FROM blog_form ORDER BY id DESC`,
        (error, rows) => {
            if (error) {
                console.error("Blog error:", error);
                return res.status(500).json({ 
                    success: false, 
                    error: "Unable to fetch messages." 
                });
            }

            return res.status(200).json({ 
                success: true, 
                data: rows 
            });
        }
    );
}
