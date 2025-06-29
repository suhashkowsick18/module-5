import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { authenticateJWT, authorizeRole } from "../middleware/authMiddleware";

const router = express.Router();
const secretKey = process.env.JWT_SECRET || "your-secret-key";

// Register
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
});

// Login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

// Protected Route (Admin only)
router.get("/users", authenticateJWT, authorizeRole("admin"), async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
});

export default router;
