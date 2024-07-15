const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendRegistrationEmail = async (user) => {
  const subject = 'Welcome to Credit Repair';
  const text = `Hello ${user.name},\n\nThank you for registering at Credit Repair.\n\nBest regards,\nCredit Repair Team`;
  await sendEmail(user.email, subject, text);
};

exports.sendPasswordResetEmail = async (user, resetToken) => {
  const subject = 'Password Reset';
  const text = `Hello ${user.name},\n\nYou requested a password reset. Click the following link to reset your password: ${process.env.BASE_URL}/api/auth/reset/${resetToken}\n\nBest regards,\nCredit Repair Team`;
  await sendEmail(user.email, subject, text);
};

exports.sendDisputeFollowUpEmail = async (user, dispute) => {
  const subject = 'Dispute Follow-Up';
  const text = `Hello ${user.name},\n\nYour dispute with ID ${dispute._id} is still pending. We are following up on it.\n\nBest regards,\nCredit Repair Team`;
  await sendEmail(user.email, subject, text);
};
