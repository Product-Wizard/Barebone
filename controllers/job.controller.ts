
import asyncHandeler from "express-async-handler";
import Job from "../models/job.model";
import JobValidators from "../validators/job.validators";

const createJob = asyncHandeler(async (req, res, next) => {
  const { value, error } = JobValidators.createJobValidator.validate(req.body);
  const job = await Job.create(value);


})




const JobController = {
  createJob
}

export default JobController;