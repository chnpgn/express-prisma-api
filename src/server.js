import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

config(); // Load environment variables from .env file
connectDB(); // Connect to the database before starting the server

const app = express();
// ✅ Allow JSON bodies
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// Handle graceful shutdown
const gracefulShutdown = async () => {
    console.log("Shutting down gracefully...");
    await disconnectDB(); // Disconnect from the database
    server.close(() => {
        console.log("Server closed.");
        process.exit(0); // Exit the process with a success code
    });
};

// Listen for termination signals (e.g., SIGINT, SIGTERM)
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
