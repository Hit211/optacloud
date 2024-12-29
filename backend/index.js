import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8000; 

app.use("/api/addresses", addressRoutes);

app.listen(PORT, () => console.log("Server running on port", PORT));
