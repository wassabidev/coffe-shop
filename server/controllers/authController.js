import User from "../models/User.js";
import Session from "../models/Session.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30s",
      },
    );

    const session = await new Session({
      userId: user._id,
      userAgent: req.headers["user-agent"],
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    }).save();

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        session: session._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );

    session.refreshToken = refreshToken;
    await session.save();

    res.json({
      token,
      refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo fallo al intentar loggearse",
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    console.log("Forgot password request received", req.body);
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const rawToken = bcrypt.hashSync(
      user._id.toString() + Date.now().toString(),
      10,
    );
    const encodedToken = encodeURIComponent(rawToken);

    user.resetToken = encodedToken;
    user.resetTokenExpires = new Date(Date.now() + 3600000);
    await user.save();
    console.log("Token guardado en usuario:", user.resetToken);

    const resetLink = `http://localhost:5173/reset-password/${encodedToken}`;
    await sendEmail(
      email,
      "Restablecer contraseña",
      `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
    );
    console.log("Reset link sent to email:", sendEmail);
    res.status(200).json({
      message: "Enlace de restablecimiento de contraseña enviado al correo",
    });
  } catch (error) {
    console.error(
      "Error al enviar el enlace de restablecimiento de contraseña:",
      error,
    );
    res.status(500).json({
      message:
        "Algo fallo al intentar enviar el enlace de restablecimiento de contraseña",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log("Reset password request received", req.body);
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ mensaje: "Token de restablecimiento no válido" });
    }
    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res.status(500).json({
      message: "Algo fallo al intentar restablecer la contraseña",
      error: error.message,
    });
  }
};
