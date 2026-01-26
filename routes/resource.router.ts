import { Router } from "express";
import JobController from "../controllers/resource.controller.js";
const {
  createResource,
  deleteResource,
  updateResource,
  getResources
} = JobController

const resourceRoutes = Router();

resourceRoutes.get("/", getResources);
resourceRoutes.post("/", createResource);
resourceRoutes.delete("/:id", deleteResource);
resourceRoutes.put("/:id", updateResource);

export default resourceRoutes;