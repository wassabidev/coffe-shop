import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aldofranco991@gmail.com",
    pass: "ipxk jids jgjq dorw",
  },
});

const mailOptions = {
  from: "aldofranco991@gmail.com",
  to: "patchsam016@gmail.com",
  subject: "Hola Mundo!",
  text: "Explicar qué es un Closure en Javascript!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log("Error al enviar el correo:", error);
  } else {
    console.log("Correo enviado:", info.response);
  }
});
