import asyncHandeler from "express-async-handler";
import Student, { StudentModelInterface } from "../models/student.model.js";
import StudentValidators from "../validators/student.validators.js";
import bcrypt from "bcryptjs";


const createStudent = asyncHandeler(async (req, res, next) => {
  const { value, error } = StudentValidators.createStudentValidator.validate(req.body);
  if (error) {
    res.status(400).json({
      error: true,
      data: null,
      message: error.details[ 0 ].message.replaceAll("_", " ")
        .replaceAll("[", " ")
        .replaceAll("]", " "),
    });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(`${process.env.DEFAULT_PASSWORD!}`, salt);
  const data: Omit<StudentModelInterface, "id" | "defaultPassword"> = {
    ...value,
    password: hashedPassword,
  };
  const student = await Student.create(data);
  res.status(201).json({
    error: false,
    data: student.getStudentData,
    message: "your student data has been recorded"
  })
});

const StudentController = {
  createStudent,
}

export default StudentController;