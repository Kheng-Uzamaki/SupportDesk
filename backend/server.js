import express from "express";
import dotenv from "dotenv/config";
import router from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(201).json({ message: "Welcome to supportDesk API" });
});

//Routes
app.use("/api/users", router);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
