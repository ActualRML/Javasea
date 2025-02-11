const nodemailer = require("nodemailer");
require("dotenv").config(); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    }
  });

const sendMail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      text,
    });
    console.log(`✅ Email berhasil dikirim ke ${to}`);
  } catch (error) {
    console.error(`❌ Gagal mengirim email:`, error);
  }
};

module.exports = sendMail;

