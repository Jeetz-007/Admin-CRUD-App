import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    price: { type: Number, required: true },
    category: String,
    stock: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
