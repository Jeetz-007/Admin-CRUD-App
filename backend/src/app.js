import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Public auth
app.use("/api/auth", authRoutes);

// Products
app.use("/api/products", productRoutes);

export default app;
