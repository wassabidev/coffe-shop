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
    const products = await Category.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Category.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(typeof id);

  try {
    const result = await Category.deleteOne({ _id: id });
    console.log("Resultado de deleteOne:", result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar el producto", error });
  }
};
