import { Router } from "express";
import StudentController from "../controllers/student.controller.js";
const {
  createStudent,
  getStudents,
  deleteStudent
} = StudentController

const studentRoutes = Router();

studentRoutes.post("/create", createStudent);
studentRoutes.get("/", getStudents);
studentRoutes.delete("/:id", deleteStudent);

export default studentRoutes;