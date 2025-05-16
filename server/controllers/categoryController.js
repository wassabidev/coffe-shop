import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log("req.body", name, description);
    const category = new Category({
      name,
      description,
    });
    await category.save();
    res
      .status(201)
      .json({ data: category, message: "Categoria creada con exito" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la categoria.", error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategory");
    res
      .status(200)
      .json({ data: categories, message: "Categorias optenidas con exito" });
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
      return res.status(400).json({ message: "Categoria no encontrado" });
    }
    res.status(200).json({ data: result, message: "Categoria eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar el categoria", error });
  }
};
