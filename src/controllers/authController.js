import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    // Lets register the user in the database and return a token
    const { name, email, password } = req.body;

    // Check if user already exists in the database
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate a token for the user
    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: { id: user.id, name: user.name, email: user.email },
      },
      token,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      status: "error",
      message: "Something went wrong during registration",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Let login the users
    const { email, password } = req.body;

    // Check if user's email exists in the database table
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token for the user
    const token = generateToken(user.id, res);

    res.status(200).json({
      status: "success",
      message: "User login successfully",
      data: {
        user: { id: user.id, email: user.email },
      },
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      status: "error",
      message: "Something went wrong during login",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export { register, login, logout };
