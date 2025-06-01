import Favorites from "../models/Favorites.js";

export const toggleFavorite = async (req, res) => {
  const { product } = req.body;
  try {
    const existing = await Favorites.findOne({
      user: req.user.id,
      product: product,
      deletedAt: { $exists: false },
    }).populate("product");

    if (existing) {
      existing.deletedAt = new Date();
      await existing.save();
      return res
        .status(200)
        .json({ data: existing.product, message: "Producto eliminado" });
    }
    const previouslyDeleted = await Favorites.findOne({
      user: req.user.id,
      product: product,
      deletedAt: { $exists: true },
    });

    if (previouslyDeleted) {
      previouslyDeleted.deletedAt = undefined;
      await previouslyDeleted.save();
      await previouslyDeleted.populate("product");
      return res.status(201).json({
        message: "Producto restaurado a favoritos",
        data: previouslyDeleted.product,
      });
    }

    const newFavorite = new Favorites({
      user: req.user.id,
      product,
    });

    await newFavorite.save();
    await newFavorite.populate("product");
    res.status(201).json({
      message: "Producto agregado a favoritos",
      data: newFavorite.product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error al agregar/eliminar favorito",
      error: err.message,
    });
  }
};
export const getFavorites = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await Favorites.countDocuments({
      user: req.user.id,
      deletedAt: { $exists: false },
    });
    const favorites = await Favorites.find({
      user: req.user.id,
      deletedAt: { $exists: false },
    })
      .populate("product")
      .skip(skip)
      .sort({ createdAt: -1, _id: -1 })
      .limit(parseInt(limit));

    const items = favorites.map((favorite) => favorite.product);
    res.status(200).json({
      data: items,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      total,
      message: "Favoritos obtenidos con éxito",
    });
  } catch (err) {
    res
      .status(500)
      .json({ messge: "Error al obtener favoritos", error: err.message });
  }
};
