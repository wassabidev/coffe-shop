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
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la categoria.", error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategory");
    res
      .status(200)
      .json({ message: "Categorias optenidas con exito", data: categories });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.paramas;
  const { name, description } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { updatedAt: new Date() },
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
    const result = await Category.deleteOne({ _id: id });
    console.log("Resultado de deleteOne:", result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Categoria no encontrado" });
    }
    res.status(200).json({ message: "Categoria eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar el categoria", error });
  }
};
