import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import favoritesRoutes from "./routes/favoriteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // o dominio de Vercel
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
  }),
);
connectDB();

app.use("/uploads", express.static("../public/uploads"));

app.use("/api/products", productRoutes);

app.use("/api", loginRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/subcategory", subcategoryRoutes);

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
