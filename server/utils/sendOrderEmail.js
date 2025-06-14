import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderEmail = async ({ userEmail, items, total }) => {
  const itemList = items
    .map(
      (item) =>
        `• ${item.product.name} x${item.quantity} (${item.size}) - ${item.product.price} Gs c/u`,
    )
    .join("\n");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "🧾 Nueva orden confirmada",
    text: `Se confirmó una nueva orden:\n\n${itemList}\n\nTotal: ${total} Gs`,
  };

  await transporter.sendMail(mailOptions);
};
