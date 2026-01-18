exports.me = (req, res) => {
  res.json({
    user: {
      id: req.user.id
    }
  });
};

exports.dashboard = (req, res) => {
  res.json({ message: "Dashboard OK" });
};
