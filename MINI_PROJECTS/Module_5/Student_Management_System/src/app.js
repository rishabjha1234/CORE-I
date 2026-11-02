import express from "express";
import studentRoutes from "./routes/student.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Student Result Management API is running" });
});

app.use("/api/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
