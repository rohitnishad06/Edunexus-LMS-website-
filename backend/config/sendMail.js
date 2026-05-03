import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "EduNexus",
          email: process.env.EMAIL, // Verified Brevo Email
        },

        to: [
          {
            email: email,
          },
        ],

        subject: "Password Reset OTP",

        htmlContent: `
          <div style="font-family: Arial; padding: 20px;">
            
            <h2>Password Reset OTP</h2>

            <p>Your OTP is:</p>

            <h1 style="color: blue;">
              ${otp}
            </h1>

            <p>This OTP will expire in 5 minutes.</p>

          </div>
        `,
      },

      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email Sent Successfully:", response.data);

  } catch (error) {
    console.log(
      "Brevo Mail Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to send email");
  }
};

export default sendMail;