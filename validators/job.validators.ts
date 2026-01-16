import Joi from "joi";
import { CreateJobType } from "../models/job.model";

const createJobValidator = Joi.object<CreateJobType>({
  category: Joi.string().required(),
  title: Joi.string().required(),
  company: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  organization_id: Joi.number().required(),
  type: Joi.string().required().valid("marketing", "tech", "admin", "research", "finance", "design"),
});

const JobValidators = {
  createJobValidator
}

export default JobValidators;





