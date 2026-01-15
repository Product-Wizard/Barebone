import { Router } from "express";
import jobController from "../controllers/job.controller";
const {
  createJob
} = jobController

const jobRoutes = Router();

jobRoutes.post("/create", createJob);

export default jobRoutes;