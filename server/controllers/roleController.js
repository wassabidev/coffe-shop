import Role from "../models/Role.js";
import User from "../models/User.js";

export const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const roleExist = await Role.exists({ name });
    if (roleExist) {
      return res.status(400).json({ message: "El role ya existe" });
    }
    const role = new Role({
      name,
      description,
    });
    await role.save();
    res.status(201).json({ data: role, message: "rol creada con exito" });
  } catch (error) {
    console.log("Error al crear nuevo tipo:", error);
    res.status(400).json({
      message: "Error al crear un nuevo role.",
      error: error.message,
    });
  }
};

export const getRoles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    if (req.query.all === "true") {
      const roles = await Role.find({
        deletedAt: { $exists: false },
      }).sort({ createdAt: -1, _id: -1 });

      return res.status(200).json({
        data: {
          roles,
        },
        message: "Roles optenidos con exito",
      });
    }
    const skip = (page - 1) * limit;
    const roles = await Role.find({
      deletedAt: { $exists: false },
    })
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Role.countDocuments({
      deletedAt: { $exists: false },
    });
    res.status(200).json({
      data: {
        roles,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
      message: "roles optenidas con exito",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las roles", error });
  }
};

export const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role no encontrada" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener rol", error });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  try {
    const roleExist = await Role.findOne({
      name: req.body.name,
      _id: { $ne: id },
    });
    if (roleExist) {
      return res.status(400).json({ message: "rol ya existe" });
    }
    const role = await Role.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updatedAt: new Date(),
      },
      { new: true },
    );

    res.status(200).json({
      message: "Categoria actualizada",
      data: role,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error al actualizar la rol",
      error: err.message,
    });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const usersWithRole = await User.countDocuments({ role: id });
    if (usersWithRole > 0) {
      return res
        .status(400)
        .json({ message: "No se puede eliminar el rol asignado a usuarios" });
    }
    const role = await Role.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
    if (!role) {
      return res.status(404).json({ message: "rol no encontrado" });
    }

    res.status(200).json({ data: role, message: "Subategoria eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar la rol", error });
  }
};
