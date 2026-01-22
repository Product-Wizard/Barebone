import Joi from "joi";
import { CreateJobType } from "../models/job.model.js";

const createJobValidator = Joi.object<CreateJobType>({
  category: Joi.string().required().valid("stem", "humanities_and_art", "commercial_and_finance", "non_Profit"),
  title: Joi.string().required(),
  company: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  link: Joi.string().required().uri(),
  // organization_id: Joi.number().required(),
  type: Joi.string().required().valid('remote', 'on-site', 'hybrid'),
  job_training_scope: Joi.string().required().valid("siwes_or_general", "graduate_training", "international"),
});

const updateJobValidator = Joi.object<CreateJobType>({
  category: Joi.string().required().valid("stem", "humanities_and_art", "commercial_and_finance", "non_Profit"),
  title: Joi.string().required(),
  company: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  link: Joi.string().required().uri(),
  // organization_id: Joi.number().required(),
  type: Joi.string().required().valid('remote', 'on-site', 'hybrid'),
  job_training_scope: Joi.string().required().valid("siwes_or_general", "graduate_training", "international"),
});

const JobValidators = {
  createJobValidator,
  updateJobValidator
}

export default JobValidators;





