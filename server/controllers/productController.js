import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, stock, subcategory, category, price } = req.body;
    const image = req.file ? req.file.filename : null;
    const product = new Product({
      name,
      description,
      stock,
      subcategory,
      category,
      price,
      image,
      createdAt: new Date(),
    });
    await product.save();
    res
      .status(201)
      .json({ message: "Producto creado con exitio", data: product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear el producto", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    if (req.query.all === "true") {
      const products = await Product.find({
        deletedAt: { $exists: false },
      })
        .populate("subcategory")
        .populate({
          path: "category",
          populate: {
            path: "subcategory",
          },
        })
        .sort({ createdAt: -1, _id: -1 });

      return res.status(200).json({
        message: "Productos sin paginacion optenidos correctamente",
        data: { products: products },
      });
    }
    const skip = (page - 1) * limit;
    const products = await Product.find({
      deletedAt: { $exists: false },
    })
      .populate("subcategory")
      .populate({
        path: "category",
        populate: {
          path: "subcategory",
        },
      })
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Product.countDocuments({
      deletedAt: { $exists: false },
    });

    res.status(200).json({
      message: "Productos con paginacion optenidos correctamente",
      data: {
        products,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
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
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, subcategory, category, price } = req.body;
  const productInDb = await Product.findById(id);
  const image = req.file ? req.file.filename : productInDb.image;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        stock,
        subcategory,
        category,
        price,
        image,
        updatedAt: new Date(),
      },
      { new: true },
    );
    res.json({ message: "Producto actualizado correctamente", data: product });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error al actualizar el producto", error: err });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
    console.log("Resultado de deleteOne:", result);
    if (!result) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ data: result, message: "Producto eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar el producto", error });
  }
};
