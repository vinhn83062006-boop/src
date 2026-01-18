require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

/*
   CONNECT MONGODB
*/
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* 
   MIDDLEWARE
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 
   API ROUTES
*/
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

/*
   STATIC HTML PAGES
 */
app.use(express.static(path.join(__dirname, "pages")));
app.use("/", require("./routes/pageRouters"));

/*  
   TEST
 */
app.get("/test", (req, res) => {
  res.json({ message: "Backend running OK" });
});

/* 
   START SERVER
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
