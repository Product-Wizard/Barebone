import Joi from "joi";
import { CreateStudentType } from "../models/student.model.js";


const createStudentValidator = Joi.object<CreateStudentType>({
  full_name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  internship_type: Joi.string().valid("general_internship", "siwes", "graduate_opportunities", "students_sign_up"),
  course_of_study: Joi.string().required(),

});

const StudentValidators = {
  createStudentValidator
}

export default StudentValidators;





