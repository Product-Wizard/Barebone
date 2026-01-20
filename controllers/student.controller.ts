import asyncHandeler from "express-async-handler";
import Student, { StudentModelInterface } from "../models/student.model.js";
import StudentValidators from "../validators/student.validators.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";


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


const getStudents = asyncHandeler(async (req, res, next) => {
  const { type, page: stringPage, perPage: stringPerPage, ...othersQueryParams } = req.query
  const page = parseInt(stringPage as string || "1");
  const perPage = parseInt(stringPerPage as string || "50");
  const otherQueryKeys = Object.keys(othersQueryParams);
  const orQueryKeys: any[] | undefined = otherQueryKeys.length === 0 ? undefined :
    otherQueryKeys.map((key) => ({ [ key ]: { [ Op.like ]: `%${othersQueryParams[ key as any ]}%` } }));

  let whereQuery: any = {};
  if (orQueryKeys) whereQuery = { ...whereQuery, [ Op.or ]: [ ...orQueryKeys ] };
  if (type) whereQuery.type = type;
  const students = await Student.findAll({
    limit: perPage,
    order: [ [ "createdAt", "desc" ] ],
    offset: page > 1 ? (page - 1) * perPage : 0,
    where: whereQuery,
  });

  const totalStudents = await Student.count({
    where: whereQuery,
  });
  const pagesCount = Math.ceil(totalStudents / perPage)
  res.status(200).json({
    error: false,
    data: students,
    message: `Students on page ${page}`,
    pagination: {
      nextPage: page < pagesCount ? page + 1 : page,
      previousPage: page > 1 ? page - 1 : 0,
      totalPages: pagesCount
    }
  })
});

const deleteStudent = asyncHandeler(async (req, res, next) => {
  const student = await Student.findOne({ where: { id: req.params.id } });
  if (!student) {
    res.status(404).json({ error: true, message: "student dosen't exist", data: null });
    return;
  }
  await student.destroy();
  res.status(200).json({
    error: false,
    data: null,
    message: "student deleted"
  });
});

const StudentController = {
  createStudent,
  getStudents,
  deleteStudent,
}

export default StudentController;