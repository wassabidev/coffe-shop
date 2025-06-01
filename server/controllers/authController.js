import User from "../models/User.js";
import Session from "../models/Session.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
