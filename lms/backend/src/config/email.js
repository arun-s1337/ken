// config/email.config.mjs
import nodemailer from "nodemailer";

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "johnpauljayakumar08@gmail.com",
    pass: "ecyi erej lamj taqo",
  },
});

export default transporter;
