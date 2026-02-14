import nodemailer from "nodemailer";

const sendMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
auth: {
  user: process.env.EMAIL,
  pass: process.env.PASS,
},

    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset OTP</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.log("Mail Error:", error);
    throw error;
  }
};

export default sendMail;
