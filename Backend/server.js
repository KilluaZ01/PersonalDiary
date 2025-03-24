import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", authRoutes);
app.use("/api/diary", diaryRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
