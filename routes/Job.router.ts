import { Router } from "express";
import jobController from "../controllers/job.controller.js";
const {
  createJob,
  deleteJob,
  updateJob,
  getJobs
} = jobController

const jobRoutes = Router();

jobRoutes.get("/", getJobs);
jobRoutes.post("/", createJob);
jobRoutes.delete("/:id", deleteJob);
jobRoutes.put("/:id", updateJob);

export default jobRoutes;