const nodemailer = require('nodemailer');
const { generateWelcomeEmail } = require('../utils/emailTemplates');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendWelcomeEmail = async (to, userName) => {
  const mailOptions = {
    from: `"Gooup1"  ${process.env.EMAIL}`,
    to: to,
    subject: 'Chào mừng bạn đến với Gooup1',
    html: generateWelcomeEmail(userName),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
};
