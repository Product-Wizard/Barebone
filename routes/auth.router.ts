import { Router } from "express";
import studentRoutes from "./student.route.js";
import organizationtRoutes from "./organization.route.js";
import adminRoutes from "./admin.route.js";

const authRoutes = Router({ mergeParams: true });


authRoutes.use("/student", studentRoutes);
authRoutes.use("/organization", organizationtRoutes);
authRoutes.use("/admin", adminRoutes);

export default authRoutes;