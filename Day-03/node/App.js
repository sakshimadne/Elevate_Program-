// Folder Structure
// pgsql
// Copy
// Edit
// crud-auth-app/
// │── node_modules/
// │── config/
// │   └── db.js
// │── controllers/
// │   ├── authController.js
// │   ├── userController.js
// │── middleware/
// │   └── authMiddleware.js
// │── models/
// │   └── User.js
// │── routes/
// │   ├── authRoutes.js
// │   ├── userRoutes.js
// │── .env
// │── server.js
// │── package.json
// │── README.md
// 1️⃣ Install Required Dependencies
// Run the following command:

// sh
// Copy
// Edit
// npm init -y
// npm install express mongoose dotenv bcryptjs jsonwebtoken cors body-parser
// 2️⃣ Setup MongoDB Connection
// 📄 config/db.js

// js
// Copy
// Edit
// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected...");
//   } catch (error) {
//     console.error("MongoDB Connection Failed", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
// 3️⃣ Create User Model
// 📄 models/User.js

// js
// Copy
// Edit
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });

// module.exports = mongoose.model("User", userSchema);
// 4️⃣ Create Authentication Controller
// 📄 controllers/authController.js

// js
// Copy
// Edit
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Registration failed" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ error: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };
// 5️⃣ Create User CRUD Controller
// 📄 controllers/userController.js

// js
// Copy
// Edit
// const User = require("../models/User");

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch user" });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email },
//       { new: true }
//     );

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update user" });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete user" });
//   }
// };
// 6️⃣ Create Middleware for Authentication
// 📄 middleware/authMiddleware.js

// js
// Copy
// Edit
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) return res.status(401).json({ error: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Invalid Token" });
//   }
// };
// 7️⃣ Create Routes
// 📄 routes/authRoutes.js

// js
// Copy
// Edit
// const express = require("express");
// const { register, login } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;
// 📄 routes/userRoutes.js

// js
// Copy
// Edit
// const express = require("express");
// const {
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// } = require("../controllers/userController");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// router.get("/", authMiddleware, getUsers);
// router.get("/:id", authMiddleware, getUserById);
// router.put("/:id", authMiddleware, updateUser);
// router.delete("/:id", authMiddleware, deleteUser);

// module.exports = router;
// 8️⃣ Setup Server
// 📄 server.js

// js
// Copy
// Edit
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
