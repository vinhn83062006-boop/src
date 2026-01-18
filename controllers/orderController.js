const Order = require("../models/Order");

// USER CHECKOUT
exports.checkout = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      total
    });

    res.json({ message: "Đặt hàng thành công", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN XEM TẤT CẢ ĐƠN
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "email");
  res.json(orders);
};
