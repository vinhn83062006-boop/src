const Task = require("../models/Task");

// GET: lấy task của user đang login
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
};

// POST: tạo task mới
exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.userId
  });
  res.json(task);
};

// PUT: cập nhật task
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { title: req.body.title },
    { new: true }
  );
  res.json(task);
};

// DELETE: xóa task
exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
  });
  res.json({ message: "Deleted" });
};
