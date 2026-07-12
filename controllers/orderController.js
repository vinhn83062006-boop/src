const Order = require("../models/Order");

// USER CHECKOUT
exports.checkout = async (req, res) => {
  try {
    const { items, total, shipping } = req.body;


    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    if (!shipping || !shipping.name || !shipping.phone || !shipping.address) {
      return res.status(400).json({ message: "Thiếu thông tin nhận hàng" });
    }


    const order = await Order.create({
      user: req.user.id,
      items,
      total,
      shipping
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

// ADMIN XEM CHI TIẾT ĐƠN
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "email");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

// ADMIN CẬP NHẬT TRẠNG THÁI ĐƠN
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "Missing status" });

  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json(order);
};

