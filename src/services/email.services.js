require('dotenv').config();
const nodemailer = require('nodemailer');
//transporter--> to communicate with the SMTP Server ( the server that are made only to handle the Email )
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend_01" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);

    if (process.env.NODE_ENV === "development") {
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    }

  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

async function sendRegistrationEmail(userEmail, name) {
  if (!userEmail || !name) {
    throw new Error("Email and name are required");
  }

  const subject = "Welcome to Backend_01";

  const text = `Hello ${name},

Thank you for registering at Backend_01.
We're excited to have you on board!

Best regards,
The Backend_01 Team`;

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">

      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://yourdomain.com/images/logo.png" 
             alt="Backend_01 Logo" 
             width="120" />
      </div>

      <h2 style="color: #333;">Welcome, ${name}! 🎉</h2>

      <p style="color: #555; font-size: 16px;">
        Thank you for registering at <strong>Backend_01</strong>.
      </p>

      <!-- Banner Image -->
      <div style="text-align: center; margin: 20px 0;">
        <img style="width:100px"; src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s" 
             alt="Welcome Banner" 
             style="width: 100%; border-radius: 8px;" />
      </div>

      <p style="color: #555; font-size: 16px;">
        We're excited to have you on board!
      </p>

      <div style="margin-top: 30px;">
        <a href="http://localhost:3000/api/auth/login"
           style="background-color: #4CAF50; color: white; padding: 12px 20px;
                  text-decoration: none; border-radius: 6px;">
          Login to Your Account
        </a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #999;">
        Best regards,<br/>
        The Backend_01 Team
      </p>

    </div>
  </div>
`;;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
};
// module.exports = sendEmail;

// module.exports = transporter;