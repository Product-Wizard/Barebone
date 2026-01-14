import { Router } from "express";
import OrganizationController from "../controllers/organization.controller";
const {
  createOrganization
} = OrganizationController

const organizationRoutes = Router();

organizationRoutes.post("/create", createOrganization);

export default organizationRoutes;