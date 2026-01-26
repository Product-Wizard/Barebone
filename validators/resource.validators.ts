import Joi from "joi";
import { CreateResourceType } from "../models/resource.model.js";

const createResourceValidator = Joi.object<CreateResourceType>({
  category: Joi.string().required().valid("career_advice", "industry_trends", "resume_tips", "student_stories"),
  title: Joi.string().required(),
  author: Joi.string().required(),
  body: Joi.string().required(),
  imageUrl: Joi.string().required(),
  summary: Joi.string().required(),
});

const updateResourceValidator = Joi.object<CreateResourceType>({
  category: Joi.string().required().valid("career_advice", "industry_trends", "resume_tips", "student_stories"),
  title: Joi.string().required(),
  author: Joi.string().required(),
  body: Joi.string().required(),
  imageUrl: Joi.string().required(),
  summary: Joi.string().required(),
});

const ResourceValidators = {
  createResourceValidator,
  updateResourceValidator
}

export default ResourceValidators;





