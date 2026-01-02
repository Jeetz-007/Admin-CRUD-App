import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Route hit....", req.body);

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
