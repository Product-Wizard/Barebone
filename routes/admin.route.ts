import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
const {
  adminLogin
} = AuthController

const adminRoutes = Router();

adminRoutes.post("/login", adminLogin);

export default adminRoutes;