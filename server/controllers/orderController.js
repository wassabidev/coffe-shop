import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const newOrder = new Order({
      user: req.user.id,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      status: "paid",
      paidAt: new Date(),
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ message: "Error al crear la orden", error });
  }
};

export const getOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    if (req.query.all === "true") {
      const orders = await Order.find();
      return res.status(200).json({
        message: "Ordenes obtenidas sin paginacion",
        data: orders,
      });
    }

    const skip = (page - 1) * limit;
    const total = await Order.countDocuments();
    const orders = await Order.find()
      .sort({ createdAt: -1, id: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .total(total);

    if (!orders) {
      return res.status(404).json({ message: "Orden no encontrado" });
    }

    res.status(200).json({
      message: "Ordenes obtenida con paginacion",
      data: {
        orders: orders,
        total: total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los ordenes", error: error.message });
  }
};

export const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    if (req.query.all === "true") {
      const orders = await Order.find({ user: id }).populate("items.product");

      return res.status(200).json({
        message: "Ordenes obtenidas sin paginacion",
        data: orders,
      });
    }

    const skip = (page - 1) * limit;
    const total = await Order.countDocuments({ user: req.params.id });
    const orders = await Order.find({ user: id })
      .populate("items.product")
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    if (!orders) {
      return res.status(404).json({ message: "Orden no encontrado" });
    }

    res.status(200).json({
      message: "Ordenes obtenida con paginacion",
      data: {
        orders: orders,
        total: total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las Orden", error });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.findById(id);

    if (!orders) {
      return res.status(404).json({ message: "Orden no encontrado" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las Orden", error });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Order.deleteOne({ _id: id });
    console.log("Resultado de deleteOne:", result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Orden no encontrado" });
    }
    res.status(200).json({ message: "Orden eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al intentar eliminar el producto", error });
  }
};
