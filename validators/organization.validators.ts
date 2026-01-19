import Joi from "joi";
import { CreateOrganizationType } from "../models/organizations.model.js";


const createOrganizationValidator = Joi.object<CreateOrganizationType>({
  company_name: Joi.string().required().min(2).required(),
  email: Joi.string().email().required(),
  company_size: Joi.string().valid("1-10", "11-50", "50+").required(),
  industry: Joi.string().required(),
});

const OrganizationValidators = {
  createOrganizationValidator
}

export default OrganizationValidators;





