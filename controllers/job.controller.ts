
import asyncHandeler from "express-async-handler";
import Job from "../models/job.model";
import JobValidators from "../validators/job.validators";

const createJob = asyncHandeler(async (req, res, next) => {
  const { value, error } = JobValidators.createJobValidator.validate(req.body);
  const job = await Job.create(value);
  res.status(200).json({
    error: false,
    data: job.getJobData(),
    message: "job listing created"
  });
})




const JobController = {
  createJob
}

export default JobController;