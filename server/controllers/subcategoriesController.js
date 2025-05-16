import Subcategory from "../models/Subcategory.js";

export const createSubcategory = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const subcategoryExist = await Subcategory.exists({ name });
    if (subcategoryExist) {
      return res.status(400).json({ message: "Tipo ya existe" });
    }
    const subcategory = new Subcategory({
      name,
      category,
      description,
    });
    await subcategory.save();
    res
      .status(201)
      .json({ data: subcategory, message: "Subcategoria creada con exito" });
  } catch (error) {
    console.log("Error al crear nuevo tipo:", error);
    res
      .status(400)
      .json({ message: "Error al crear nuevo tipo.", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({
      deletedAt: { $exists: false },
    }).populate("category");
    res
      .status(200)
      .json({ data: subcategories, message: "subcategorias encontradas" });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

export const getCategoriesById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Subcategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const updateCategories = async (req, res) => {
  const { id } = req.paramas;
  const { name, description } = req.body;
  try {
    const category = await Subcategory.findByIdAndUpdate(
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
    const result = await Subcategory.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
    console.log("Resultado de deleteOne:", result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }

    res.status(200).json({ message: "Categoria eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar el categoria", error });
  }
};
