import Joi from "joi";
import { CreateStudentType } from "../models/student.model.js";


const createStudentValidator = Joi.object<CreateStudentType>({
  full_name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  year_of_study: Joi.string().valid("fresh_man", "sophomore", "junior", "senior"),
  course_of_study: Joi.string().required(),

});

const StudentValidators = {
  createStudentValidator
}

export default StudentValidators;





