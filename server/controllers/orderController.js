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
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los ordenes", error });
  }
};

export const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ user: id }).populate("items.product");

    if (!orders) {
      return res.status(404).json({ message: "Orden no encontrado" });
    }
    res.status(200).json(orders);
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
