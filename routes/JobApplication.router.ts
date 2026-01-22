import { Router } from "express";
import JobApplicationController from "../controllers/jobApplication.controller.js";
const {
  getJobApplications,
  createJobApplication,
  deleteJobApplication,
} = JobApplicationController

const jobApplicationRoutes = Router();

jobApplicationRoutes.get("/", getJobApplications);
jobApplicationRoutes.post("/", createJobApplication);
jobApplicationRoutes.delete("/:id", deleteJobApplication);

export default jobApplicationRoutes;