const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
// public
router.get("/", productController.getAll);

// protected (dùng cho admin)
router.post("/", auth, productController.create);
router.post("/", auth, isAdmin, productController.create);

module.exports = router;
