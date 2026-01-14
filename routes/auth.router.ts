import { Router } from "express";
import studentRoutes from "./student.route";
import organizationtRoutes from "./organization.route";

const authRoutes = Router({ mergeParams: true });


authRoutes.use("/student", studentRoutes);
authRoutes.use("/organization", organizationtRoutes);

export default authRoutes;