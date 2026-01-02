import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`Electronic Store backend running on PORT ${PORT}`);
});