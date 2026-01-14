import { Router } from "express";
import StudentController from "../controllers/student.controller";
const {
  createStudent
} = StudentController

const studentRoutes = Router();

studentRoutes.post("/create", createStudent);

export default studentRoutes;