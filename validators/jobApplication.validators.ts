import Joi from "joi";
import { CreateJobApplicationType } from "../models/jobApplication.model.js";

const createJobApplicationValidator = Joi.object<CreateJobApplicationType>({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  job_id: Joi.number().required(),
  phone: Joi.string().allow(""),
});

const JobApplicationValidators = {
  createJobApplicationValidator,
}

export default JobApplicationValidators;





