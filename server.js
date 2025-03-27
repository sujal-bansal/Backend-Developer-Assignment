import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDb from "./config/db.js";
import cookieParser from "cookie-parser";
import userRotues from "./routes/user.routes.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRotues);

app.listen(PORT, () => {
  connectMongoDb();
  console.log(`Server is running on port ${PORT}`);
});
