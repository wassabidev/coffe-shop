import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";

export const createSubcategory = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const subcategoryExist = await Subcategory.exists({ name });
    if (subcategoryExist) {
      return res.status(400).json({ message: "Subcategoria ya existe" });
    }
    const subcategory = new Subcategory({
      name,
      category,
      description,
    });
    await subcategory.save();
    await Category.findByIdAndUpdate(category, {
      $addToSet: { subcategory: subcategory._id },
    });
    res
      .status(201)
      .json({ data: subcategory, message: "Subcategoria creada con exito" });
  } catch (error) {
    console.log("Error al crear nuevo tipo:", error);
    res.status(400).json({
      message: "Error al crear uan nueva subcategoria.",
      error: error.message,
    });
  }
};

export const getsubCategories = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const skip = (page - 1) * limit;
    const subcategories = await Subcategory.find({
      deletedAt: { $exists: false },
    })
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Subcategory.countDocuments();
    res.status(200).json({
      data: {
        subcategories,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
      message: "Subcategorias optenidas con exito",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las subcategorias", error });
  }
};

export const getsubCategoryById = async (req, res) => {
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

export const updatesubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const oldSub = await Subcategory.findById(id);
    const subcategoryExist = await Subcategory.findOne({
      name: req.body.name,
      _id: { $ne: id },
    });
    if (subcategoryExist) {
      return res.status(400).json({ message: "Subcategoria ya existe" });
    }
    const oldCategoryId = oldSub?.category?.toString();
    const newCategoryId = req.body.category;
    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updatedAt: new Date(),
      },
      { new: true },
    );
    //si se cambia de categoria, elimina de subcategoria de la anterorir categoria
    if (oldCategoryId && oldCategoryId !== newCategoryId) {
      await Category.findByIdAndUpdate(oldCategoryId, {
        $pull: { subcategory: subcategory._id },
      });
    }

    await Category.findByIdAndUpdate(subcategory.category, {
      $addToSet: { subcategory: subcategory._id },
    });
    res.status(200).json({
      message: "Categoria actualizada",
      data: subcategory,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error al actualizar la subcategoria",
      error: err.message,
    });
  }
};

export const deletesubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategoria no encontrado" });
    }
    if (subcategory.category) {
      await Category.findByIdAndUpdate(subcategory.category, {
        $pull: { subcategory: subcategory._id },
      });
    }
    res
      .status(200)
      .json({ data: subcategory, message: "Subategoria eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar la subcategoria", error });
  }
};
