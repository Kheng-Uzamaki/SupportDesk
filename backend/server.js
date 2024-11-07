import express from "express";
import colors from "colors";
import dotenv from "dotenv/config";
import router from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import cors from "cors"; // Import CORS

const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

const app = express();


app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(201).json({ message: "Welcome to supportDesk API" });
});

//Routes
app.use("/api/users", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
