import User from "../models/User.js";
import Session from "../models/Session.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //buscar en la bd si ya existe user con el mismo email

    const userExist = await User.exists({ email });

    if (userExist) {
      res.status(403).json({ message: "Usuario con email ya exite" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      active: true,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

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
