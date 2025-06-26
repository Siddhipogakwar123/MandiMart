const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "l.e.e.m.o.n.s.2.0.0.0.s@gmail.com",
    pass: "keib ummf tejl zcbq", // Use Gmail App Password (not your normal password)
  },
});

async function sendVerificationEmail(email, token) {
  const link = `http://localhost:3000/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Mandi Mart" <l.e.e.m.o.n.s.2.0.0.0.s@gmail.com>',
    to: email,
    subject: "Verify your email",
    html: `<h3>Click the link to verify your email:</h3><a href="${link}">${link}</a>`,
  });
//   console.log("Verification mail sent to:", email);
}

module.exports = sendVerificationEmail;
