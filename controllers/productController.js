const Product = require("../models/Product");

// GET ALL
exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// CREATE
exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

// UPDATE
exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE
exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
