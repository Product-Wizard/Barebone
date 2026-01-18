import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express"
import morgan from "morgan";
import config from "./config/config.js";
import sequelize, { connectDb } from "./config/db.config.js";
import errorResponseHandeler from "./middleware/errorhandeler.js";
import authRoutes from "./routes/auth.router.js";
import jobRoutes from "./routes/Job.router.js";

const server = express();
server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));
server.use(express.static("./public"));

// routes
server.use("/v1/auth", authRoutes);
server.use("/v1/job", jobRoutes);
server.use((req, res) => {
  res.status(404).json({ error: true, message: "resource not found" })
});

server.use(errorResponseHandeler);

server.listen(config.SERVER_PORT, (error) => {
  if (error) console.log("server failed to start: ", error);
  console.log(`server running on port ${config.SERVER_PORT}`)
});
await connectDb();
await sequelize.sync({});