import { Router } from "express";
import StudentController from "../controllers/student.controller.js";
const {
  createStudent
} = StudentController

const studentRoutes = Router();

studentRoutes.post("/create", createStudent);

export default studentRoutes;