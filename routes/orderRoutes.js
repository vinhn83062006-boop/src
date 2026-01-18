const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const controller = require("../controllers/orderController");

// user checkout
router.post("/checkout", auth, controller.checkout);

// admin xem đơn
router.get("/", auth, isAdmin, controller.getAllOrders);

module.exports = router;
