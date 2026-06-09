const Product = require("../models/Product");

// Lưu ý: Project hiện tại chưa có models/Product.
// File này chỉ nhằm tránh crash khi router/productRoutes.js bị load.
// Nếu bạn thật sự cần tính năng product, hãy tạo models/Product + hoàn thiện các hàm dưới đây.

exports.getAll = async (req, res) => {
  return res.status(501).json({ message: "Chưa triển khai product" });
};

exports.create = async (req, res) => {
  return res.status(501).json({ message: "Chưa triển khai product" });
};

