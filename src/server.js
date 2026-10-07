import express from "express";

import studentRoutes from "./routes/studentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student API is running"
  });
});

// Student routes
app.use("/api/students", studentRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Central error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});