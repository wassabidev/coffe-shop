import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryExist = await Category.exists({ name });
    if (categoryExist) {
      return res.status(400).json({ message: "La categoria ya existe" });
    }
    const category = new Category({
      name,
      description,
    });
    await category.save();
    res
      .status(201)
      .json({ data: category, message: "Categoria creada con exito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la categoria", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    if (req.query.all === "true") {
      const categories = await Category.find({
        deletedAt: { $exists: false },
      }).populate("subcategory");
      return res.status(200).json({
        data: { categories },
        message: "Todas las categorías sin paginación",
      });
    }

    const skip = (page - 1) * limit;
    const categories = await Category.find({
      deletedAt: { $exists: false },
    })
      .populate("subcategory")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Category.countDocuments({
      deletedAt: { $exists: false },
    });
    res.status(200).json({
      data: {
        categories: categories,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
      message: "Categorias con paginacion optenidas con exito",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate("subcategory");
    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.status(200).json({ data: category, message: "Categoria encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const categoryExist = await Category.exists({ name });
    if (categoryExist) {
      return res.status(400).json({ message: "La categoria ya existe" });
    }
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        updatedAt: new Date(),
      },
      { new: true },
    );
    res.status(200).json({
      message: "Categoria actualizada",
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error al actualizar la categoria",
      error: err.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Category.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
    if (!result) {
      return res.status(400).json({ message: "Categoria no encontrada" });
    }
    res.status(200).json({ data: result, message: "Categoria eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar el categoria", error });
  }
};
