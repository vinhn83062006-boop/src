const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const controller = require("../controllers/orderController");

// user checkout
router.post("/checkout", auth, controller.checkout);

// admin xem đơn (list)
router.get("/", auth, isAdmin, controller.getAllOrders);

// admin xem chi tiết đơn
router.get("/:id", auth, isAdmin, controller.getOrderById);

// admin cập nhật trạng thái đơn
router.put("/:id", auth, isAdmin, controller.updateOrderStatus);


module.exports = router;
