import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //buscar en la bd si ya existe user con el mismo email
    //const user = await authService.getUseryEmail(email);

    /* if (user) {
      res.status(403).json({ message: "Usuario con email ya exite" });
    } */
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
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
      return res.status(401).json({ error: "Authentication failed" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );

    res.json({ token, name: user.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed", error: error.menssage });
  }
};
