import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, stock, type, category, price } = req.body;
    const image = req.file ? req.file.filename : null;
    const product = new Product({
      name,
      description,
      stock,
      type,
      category,
      price,
      image,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findById(id).populate("category");
    //console.log("Productos encontrados:", products);
    if (!products) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(typeof id);

  try {
    const result = await Product.deleteOne({ _id: id });
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
