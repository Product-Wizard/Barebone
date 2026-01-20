import { Router } from "express";
import OrganizationController from "../controllers/organization.controller.js";
const {
  createOrganization,
  deleteOrganization,
  getOrganizations
} = OrganizationController

const organizationRoutes = Router();

organizationRoutes.post("/create", createOrganization);
organizationRoutes.get("/", getOrganizations);
organizationRoutes.delete("/", deleteOrganization);

export default organizationRoutes;