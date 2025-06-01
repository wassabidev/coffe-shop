import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
    const { page = 1, limit = 10 } = req.query;
    if (req.query.all === "true") {
      const users = await User.find({
        deactivatedAt: { $exists: false },
      });
      return res
        .status(200)
        .json({ data: users, message: "Usuarios obtenidos sin paginacion" });
    }
    const skip = (page - 1) * limit;
    const users = await User.find({
      deactivatedAt: { $exists: false },
    })
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({
      deactivatedAt: { $exists: false },
    });

    res.status(200).json({
      data: {
        users,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
      message: "Usuarios obtenidos con paginacion",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await User.findOneAndUpdate(
      id,
      { deactivatedAt: new Date() },
      { new: true },
    );
    if (!users) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};
