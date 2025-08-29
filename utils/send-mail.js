import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "sandbox.smtp.mailtrap.io",
  port: process.env.EMAIL_PORT || 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Attach handlebars to transporter
transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
    extName: ".handlebars",
  })
);

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      text: text,
      template: "email",
      context: {
        otp: text,
      },
    });
    console.log("Message sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
