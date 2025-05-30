const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(to, token) {
  try {
    const url = `${
      process.env.FRONTEND_URL || "http://localhost:5000/api/auth"
    }/verify/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Verify your email",
      html: `<p>Please verify your email by clicking <a href="${url}">here</a>.</p>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error in mail serder: ", err);
  }
}

module.exports = { transporter, sendVerificationEmail };
