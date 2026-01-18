import Joi from "joi";
import { CreateJobType } from "../models/job.model.js";

const createJobValidator = Joi.object<CreateJobType>({
  category: Joi.string().required().valid("marketing", "tech", "admin", "research", "finance", "design"),
  title: Joi.string().required(),
  company: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  link: Joi.string().required().uri(),
  // organization_id: Joi.number().required(),
  type: Joi.string().required().valid('remote', 'on-site', 'hybrid'),
});

const updateJobValidator = Joi.object<CreateJobType>({
  category: Joi.string().required().valid("marketing", "tech", "admin", "research", "finance", "design"),
  title: Joi.string().required(),
  company: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  link: Joi.string().required().uri(),
  // organization_id: Joi.number().required(),
  type: Joi.string().required().valid('remote', 'on-site', 'hybrid'),
});

const JobValidators = {
  createJobValidator,
  updateJobValidator
}

export default JobValidators;





