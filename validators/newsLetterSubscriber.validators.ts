import Joi from "joi";
import { CreateNewsLetterSubscriberType } from "../models/newsLetterSubscriber.model.js";


const createNewsLetterSubscriberValidator = Joi.object<CreateNewsLetterSubscriberType>({
  email: Joi.string().email().required(),
});

const NewsLetterSubscriberValidators = {
  createNewsLetterSubscriberValidator
}

export default NewsLetterSubscriberValidators;





