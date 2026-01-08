import dotenv from "dotenv"
dotenv.config();
import express from "express"
import config from "./config/config";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.listen(config.SERVER_PORT, (error) => {
  if (error) console.log("server failed to start: ", error);
  console.log(`server running on port ${config.SERVER_PORT}`)
})